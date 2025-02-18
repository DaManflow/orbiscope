const express = require('express');
const router = express.Router();
const { importCountries, searchCountries,} = require('../controllers/countryController');
const Country = require('../models/countryModel');  // Ajouter l'importation du modèle Country

// Route pour importer les pays
router.post('/import', importCountries);

// Route pour rechercher les pays
router.get('/search', searchCountries);


// Route pour récupérer tous les pays
router.get('/', async (req, res) => {  // Cette route permet de récupérer tous les pays
  try {
    const countries = await Country.find().sort({ commonName: 1 }); // Trier par nom de pays
    res.json(countries);  // Retourner la liste des pays au format JSON
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des pays' });
  }
});

module.exports = router;
