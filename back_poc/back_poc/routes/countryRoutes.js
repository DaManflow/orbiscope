const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Country = require('../models/countryModel');

// Route pour importer les pays depuis REST Countries
router.post('/import', async (req, res) => {
  console.log("Route /countries/import appelée !");
  try {
    const filePath = path.join(__dirname, '../data/all_countries.json');
    console.log("Chemin du fichier JSON :", filePath);

    // Vérifiez si le fichier JSON existe
    if (!fs.existsSync(filePath)) {
      console.error("Fichier JSON introuvable !");
      return res.status(404).json({ error: "Fichier JSON introuvable" });
    }

    // Lire et analyser les données du fichier JSON
    const countriesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log("Données JSON chargées avec succès :", countriesData.length, "pays trouvés.");

    // Formater les données avant insertion
    const formattedCountries = countriesData.map((country) => {
      const commonName = country.name?.common || 'N/A';
      const officialName = country.name?.official || 'N/A';
      const flagUrl = country.flags?.png || 'URL par défaut';
      const region = country.region || 'N/A';
      const capital = (country.capital && country.capital[0]) || 'N/A';
      const continent = country.continents ? country.continents[0] : 'N/A';
      const countryCode = country.cca2 || 'N/A';

      const currencies = country.currencies
        ? Object.entries(country.currencies).map(([code, details]) => ({
            code: code,
            name: details.name || 'N/A',
            symbol: details.symbol || 'N/A',
          }))
        : [];

      const languages = country.languages ? Object.values(country.languages) : [];
      const translations = country.translations || {};
      const frenchName = translations.fra?.common || 'N/A';
      const englishName = translations.eng?.common || 'N/A';
      const spanishName = translations.spa?.common || 'N/A';

      const flags = {
        png: country.flags?.png || 'N/A',
        svg: country.flags?.svg || 'N/A',
        alt: country.flags?.alt || 'No description available',
      };

      return {
        commonName,
        officialName,
        flagUrl,
        region,
        capital,
        continent,
        countryCode,
        currencies,
        languages,
        translations: {
          french: frenchName,
          english: englishName,
          spanish: spanishName,
        },
        flags,
      };
    });

    // Suppression des anciennes données
    console.log("Suppression des anciennes données...");
    await Country.deleteMany();
    console.log("Anciennes données supprimées.");

    // Insertion des nouvelles données
    console.log("Insertion des nouvelles données...");
    await Country.insertMany(formattedCountries);
    console.log("Nouvelles données insérées avec succès.");

    res.status(201).json({ message: "Données insérées avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'importation :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de l'importation des données" });
  }
});

// Route pour récupérer tous les pays
router.get('/countries', async (req, res) => {
  console.log("Route /countries appelée !");
  try {
    const countries = await Country.find().sort({ commonName: 1 });
    console.log(countries.length, "pays retournés.");
    res.json(countries);
  } catch (err) {
    console.error("Erreur dans la route /countries :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour les recherches (inchangée dans cette version)
router.get('/search', async (req, res) => {
  const { q, color, symbol, continent, code, capital } = req.query;
  try {
    let query = { $and: [] };

    const colorTranslations = { 'rouge': 'red', 'vert': 'green', 'bleu': 'blue' }; // Exemple simple
    const continentTranslations = { 'afrique': 'Africa', 'asie': 'Asia', 'europe': 'Europe' };

    if (q) {
      query.$and.push({
        $or: [
          { commonName: { $regex: `^${q}`, $options: 'i' } },
          { 'translations.french': { $regex: `^${q}`, $options: 'i' } },
        ],
      });
    }

    if (continent) {
      const continentInEnglish = continentTranslations[continent.toLowerCase()] || continent;
      query.$and.push({ continent: continentInEnglish });
    }

    const countries = await Country.find(query).sort({ commonName: 1 });
    console.log(countries.length, "pays trouvés pour la recherche.");
    res.json(countries);
  } catch (err) {
    console.error("Erreur dans la route /search :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;
