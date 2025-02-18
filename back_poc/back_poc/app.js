// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importer les routes
const countryRoutes = require('./routes/countryRoutes');

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB Atlas réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB Atlas :', err));

// Utiliser les routes pour `/countries`
app.use('/countries', countryRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
