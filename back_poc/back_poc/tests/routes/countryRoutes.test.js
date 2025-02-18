const mongoose = require('mongoose');
const Country = require('../../models/countryModel');
require('dotenv').config({ path: './.env' });
const request = require('supertest');
const app = require('../../app');

describe('Tests pour les routes /countries', () => {
  beforeAll(async () => {
    // Connexion à la base de données avant les tests
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aura5_poc';
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Fermeture de la connexion à la base de données après les tests
    await mongoose.connection.close();
  });

  it('Devrait importer les pays depuis un fichier JSON', async () => {
    const res = await request(app).post('/countries/import');
    console.log(res.status, res.body); // Log de la réponse
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Données insérées avec succès');
  });

  it('Devrait retourner des résultats pour tous les pays', async () => {
    const res = await request(app).get('/countries');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Devrait retourner des résultats pour une recherche valide', async () => {
    const res = await request(app).get('/countries/search?q=France');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('commonName', 'France');
  });

  it('Devrait retourner une erreur 404 pour une route inexistante', async () => {
    const res = await request(app).get('/nonexistentroute');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Route introuvable');
  });
});
