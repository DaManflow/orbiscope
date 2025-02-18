const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');
const app = require('../../app'); // Importer l'application Express
const Country = require('../../models/countryModel'); // Le modèle Mongoose

jest.mock('fs'); // Mock de fs pour simuler la lecture de fichier

let mongoServer;

beforeAll(async () => {
  // Initialiser MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connexion à la base de données en mémoire
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Fermer la connexion et arrêter MongoMemoryServer
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Nettoyer la base de données après chaque test
  await Country.deleteMany();
});

describe('Tests des routes /countries et /search', () => {
  describe('POST /countries/import', () => {
    it('devrait importer les pays depuis un fichier JSON', async () => {
      // Mock de la méthode fs.readFileSync
      fs.readFileSync.mockReturnValueOnce(
        JSON.stringify([
          {
            name: { common: 'France', official: 'République française' },
            flags: { png: 'france.png', svg: 'france.svg', alt: 'Drapeau de la France' },
            region: 'Europe',
            capital: ['Paris'],
            continents: ['Europe'],
            cca2: 'FR',
            currencies: {
              EUR: { name: 'Euro', symbol: '€' },
            },
            languages: { fra: 'Français' },
            translations: {
              fra: { common: 'France' },
              eng: { common: 'France' },
              spa: { common: 'Francia' },
            },
          },
        ])
      );

      const res = await request(app).post('/countries/import');

      expect(res.status).toBe(201); // Vérifie le succès de l'importation
      expect(res.body.message).toBe('Données insérées avec succès');

      // Vérifie que les données ont été insérées dans la base de données
      const countries = await Country.find();
      expect(countries).toHaveLength(1);
      expect(countries[0].commonName).toBe('France');
    });

    it('devrait gérer une erreur de lecture de fichier', async () => {
      fs.readFileSync.mockImplementationOnce(() => {
        throw new Error('Erreur lors de la lecture du fichier');
      });

      const res = await request(app).post('/countries/import');

      expect(res.status).toBe(500); // Vérifie que le serveur retourne une erreur
      expect(res.body.error).toBe("Erreur serveur lors de l'importation des données");
    });
  });

  describe('GET /countries', () => {
    it('devrait retourner tous les pays triés par commonName', async () => {
      await Country.insertMany([
        { commonName: 'France', region: 'Europe' },
        { commonName: 'Allemagne', region: 'Europe' },
      ]);

      const res = await request(app).get('/countries');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].commonName).toBe('Allemagne'); // Tri alphabétique
      expect(res.body[1].commonName).toBe('France');
    });

    it('devrait gérer une erreur serveur', async () => {
      jest.spyOn(Country, 'find').mockImplementationOnce(() => {
        throw new Error('Erreur serveur');
      });

      const res = await request(app).get('/countries');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Erreur serveur');
    });
  });

  describe('GET /search', () => {
    it('devrait retourner les pays correspondant à une recherche par nom', async () => {
      await Country.insertMany([
        { commonName: 'France', region: 'Europe', capital: 'Paris' },
        { commonName: 'Allemagne', region: 'Europe', capital: 'Berlin' },
      ]);

      const res = await request(app).get('/search?q=Fra');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].commonName).toBe('France');
    });

    it('devrait retourner les pays correspondant à une recherche par continent', async () => {
      await Country.insertMany([
        { commonName: 'France', region: 'Europe', continent: 'Europe' },
        { commonName: 'Brésil', region: 'Amérique du Sud', continent: 'South America' },
      ]);

      const res = await request(app).get('/search?continent=Europe');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].commonName).toBe('France');
    });

    it('devrait retourner une erreur si aucun pays ne correspond', async () => {
      const res = await request(app).get('/search?q=XYZ');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0); // Aucun résultat trouvé
    });

    it('devrait gérer une recherche par couleur', async () => {
      await Country.insertMany([
        { commonName: 'France', region: 'Europe', colors: ['blue', 'white', 'red'] },
        { commonName: 'Allemagne', region: 'Europe', colors: ['black', 'red', 'yellow'] },
      ]);

      const res = await request(app).get('/search?color=red');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2); // Les deux pays contiennent la couleur rouge
    });

    it('devrait gérer une recherche par symbole', async () => {
      await Country.insertMany([
        { commonName: 'France', region: 'Europe', symbols: ['star', 'cross'] },
        { commonName: 'Allemagne', region: 'Europe', symbols: ['eagle'] },
      ]);

      const res = await request(app).get('/search?symbol=star');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1); // Un seul pays contient l'étoile
      expect(res.body[0].commonName).toBe('France');
    });
  });
});
