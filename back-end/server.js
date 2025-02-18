require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Middleware CORS
const cron = require('node-cron'); // Pour le cron job
const os = require('os'); // Pour collecter les métriques système

const countryRoutes = require('./routes/countryRoutes');
const metricsRoutes = require('./routes/metricsRoutes'); // Routes des métriques
const MetricsModel = require('./models/metricsModel'); // Modèle pour enregistrer les métriques
const logApiMetrics = require('./middlewares/metricsMiddleware'); // Importer le middleware


const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(cors()); // Gérer les CORS

// Configuration de MongoDB et du port
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connexion à MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Routes principales
app.use('/api', logApiMetrics); // Middleware logApiMetrics doit être avant les routes spécifiques
app.use('/api/countries', countryRoutes);
app.use('/metrics', metricsRoutes);
// Route de test
app.get('/', (req, res) => res.send('API fonctionnelle'));

// Middleware global pour gérer les erreurs de route
app.use((req, res, next) => {
  const error = new Error('Page non trouvée');
  error.status = 404;
  next(error);
});

// Middleware global pour gérer les erreurs générales
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Erreur interne du serveur',
  });
});

// Fonction pour collecter les métriques système
const collectSystemMetrics = () => {
  return {
    type: "system",
    cpuUsage: os.loadavg()[0], // Moyenne de la charge CPU
    memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // Mémoire utilisée en MB
    uptime: process.uptime(), // Uptime en secondes
    timestamp: new Date(),
  };
};

// Planifier la collecte des métriques toutes les 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    console.log('Collecte des métriques système...');
    const metrics = collectSystemMetrics();
    await MetricsModel.create(metrics);
    console.log('Métriques système enregistrées.');
  } catch (error) {
    console.error('Erreur lors de la collecte des métriques système:', error);
  }
});

// Lancer le serveur
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
