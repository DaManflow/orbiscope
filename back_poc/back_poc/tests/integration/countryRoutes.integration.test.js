const fs = require('fs');
require('dotenv').config({ path: './.env' });

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); // Assurez-vous du bon chemin vers app.js

// Mock des données de fichiers
jest.mock('fs');
const mockData = [
  {
    name: { common: 'MockCountry', official: 'MockCountry Official' },
    flags: { png: 'https://flag.url/mock' },
    region: 'MockRegion',
    cca2: 'MC',
  },
];
fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

describe('Tests d\'intégration pour /countries', () => {
  beforeAll(async () => {
    // Connexion à la base MongoDB avant les tests
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    // Fermeture de la connexion MongoDB après les tests
    await mongoose.connection.close();
  });

  // Test valide : Importer des pays depuis un fichier JSON
  it('Devrait importer les pays depuis un fichier JSON', async () => {
    const res = await request(app).post('/countries/import');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Données insérées avec succès');
  });

  // Test valide : Retourner tous les pays
  it('Devrait retourner tous les pays', async () => {
    const res = await request(app).get('/countries');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test valide : Retourner une erreur 404 pour une route inexistante
  it('Devrait retourner une erreur 404 pour une route inexistante', async () => {
    const res = await request(app).get('/nonexistentroute');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Route introuvable');
  });
});

// Section avec des tests désactivés ou en attente de correction
describe('Tests d\'intégration pour /countries (base partagée)', () => {
  // Désactivation temporaire
  it.skip('Devrait importer des pays depuis un fichier JSON (sans effacer les données)', async () => {
    const mockData = [
      {
        name: { common: 'TestCountry', official: 'TestCountry Official' },
        flags: { png: 'https://flag.url/test' },
        region: 'TestRegion',
        cca2: 'TC',
      },
    ];
    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

    const res = await request(app).post('/countries/import');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Données insérées avec succès');

    const response = await request(app).get('/countries/search?q=TestCountry');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].commonName).toBe('TestCountry');
  });
});

// Fermeture globale de la connexion MongoDB après les tests
afterAll(async () => {
  await mongoose.connection.close();
  if (global.server) {
    global.server.close();
  }
});
