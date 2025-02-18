const fs = require('fs');
const path = require('path');
const Country = require('../models/countryModel');
const { getColorTranslation, getSymbolTranslation, getContinentTranslation, } = require('../utils/translationUtils');

// Importation des pays depuis un fichier JSON
const importCountries = async (req, res) => {
  try {
    console.log("Démarrage de l'importation des pays...");
    const filePath = path.join(__dirname, '../data/all_countries.json');
    const countriesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

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

      const languages = country.languages
        ? Object.entries(country.languages).map(([code, name]) => ({
            code,
            name,
          }))
        : [];

      const translations = country.translations || {};
      const frenchName = translations.fra?.common || 'N/A';
      const englishName = translations.eng?.common || 'N/A';
      const spanishName = translations.spa?.common || 'N/A';

      const flags = {
        png: country.flags?.png || 'N/A',
        svg: country.flags?.svg || 'N/A',
        alt: country.flags?.alt || 'No description available',
      };

      const population = country.population || 0;
      const gini = country.gini || {};

      const maps = country.maps || {
        googleMaps: 'N/A',
        openStreetMaps: 'N/A',
      };

      const timezones = country.timezones || ['N/A'];

      // Nouveaux champs ajoutés
      const coatOfArms = country.coatOfArms || {
        png: 'N/A',
        svg: 'N/A',
      };

      const demonyms = country.demonyms || {
        eng: { f: 'N/A', m: 'N/A' },
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
        population,
        gini,
        translations: {
          french: frenchName,
          english: englishName,
          spanish: spanishName,
        },
        flags,
        maps, // Ajout des cartes
        timezones, // Ajout des fuseaux horaires
        coatOfArms, // Ajout des blasons
        demonyms, // Ajout des gentilés
      };
    });

    await Country.deleteMany();
    console.log('Anciennes données supprimées');

    await Country.insertMany(formattedCountries);
    console.log('Nouvelles données insérées avec succès');

    res.status(201).json({ message: 'Données insérées avec succès' });
  } catch (err) {
    console.error("Erreur lors de l'importation des données :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de l'importation des données" });
  }
};

// Recherche des pays selon les critères
const searchCountries = async (req, res) => {
  const { q, filter, color, symbol, continent, code, capital } = req.query; 
  try {
    let query = { $and: [] };

    // Si un filtre spécifique est choisi
    if (filter) {
      switch (filter) {
        case 'name':
          if (q) {
            query.$and.push({
              $or: [
                { commonName: { $regex: `^${q}`, $options: 'i' } },
                { 'translations.french': { $regex: `^${q}`, $options: 'i' } },
                { 'translations.english': { $regex: `^${q}`, $options: 'i' } },
                { 'translations.spanish': { $regex: `^${q}`, $options: 'i' } },
              ],
            });
          }
          break;
        case 'capital':
          if (q) {
            query.$and.push({ capital: { $regex: `^${q}`, $options: 'i' } });
          }
          break;
          case 'continent':
  if (q) {
    const continentFromQuery = getContinentTranslation(q);
    query.$and.push({ continent: { $regex: `^${continentFromQuery}`, $options: 'i' } });
  }
          break;
        case 'code':
          if (q) {
            query.$and.push({ countryCode: { $regex: `^${q}`, $options: 'i' } });
          }
          break;
      
          case 'color':
            if (q) {
              const colorFromQuery = getColorTranslation(q);
              query.$and.push({ colors: { $regex: `^${colorFromQuery}`, $options: 'i' } });
            }
          break;
          case 'symbol':
  if (q) {
    const symbolFromQuery = getSymbolTranslation(q);
    query.$and.push({ symbols: { $regex: `^${symbolFromQuery}`, $options: 'i' } });
  }
          break;
        default:
          break;
      }
    } else {
      // Recherche par défaut (si aucun filtre spécifique n'est défini)
      if (q) {
        const colorsFromQuery = getColorTranslation(q) || q.toLowerCase();
        const symbolsFromQuery = getSymbolTranslation(q) || q.toLowerCase();
        const continentFromQuery = getContinentTranslation(q) || q;

        query.$and.push({
          $or: [
            { commonName: { $regex: `^${q}`, $options: 'i' } },
            { 'translations.french': { $regex: `^${q}`, $options: 'i' } },
            { 'translations.english': { $regex: `^${q}`, $options: 'i' } },
            { 'translations.spanish': { $regex: `^${q}`, $options: 'i' } },
            { countryCode: { $regex: `^${q}`, $options: 'i' } },
            { continent: { $regex: `^${continentFromQuery}`, $options: 'i' } },
            { colors: { $regex: `^${colorsFromQuery}`, $options: 'i' } },
            { symbols: { $regex: `^${symbolsFromQuery}`, $options: 'i' } },
            { capital: { $regex: `^${q}`, $options: 'i' } },
          ],
        });
      }
    }

    // Recherche par capital
    if (capital) {
      query.$and.push({ capital: { $regex: `^${capital}`, $options: 'i' } });
    }

    // Recherche par code
    if (code) {
      query.$and.push({ countryCode: code.toUpperCase() });
    }

    // Recherche par continent (hors `q`)
    if (continent && !q) {
      const continentInEnglish = getContinentTranslation(continent) || continent;
      query.$and.push({ continent: continentInEnglish });
    }

    // Si aucune condition n'est spécifiée, retourner tous les pays
    if (query.$and.length === 0) {
      query = {};
    }

    const countries = await Country.find(query).sort({ commonName: 1 });
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  importCountries,
  searchCountries,
};
