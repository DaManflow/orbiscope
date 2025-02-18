const express = require('express');
const { getSystemMetrics, getApiMetrics, getApiResponseStats } = require('../controllers/metricsController');

const router = express.Router();

// Route pour récupérer les métriques système
router.get('/system', getSystemMetrics);

// Route pour récupérer les métriques API
router.get('/api', getApiMetrics);

// Route pour récupérer les statistiques des API
router.get('/api/stats', getApiResponseStats);

module.exports = router;
