const MetricsModel = require('../models/metricsModel');

// Récupérer les métriques système
const getSystemMetrics = async (req, res) => {
  try {
    const metrics = await MetricsModel.find({ type: "system" }).sort({ timestamp: -1 }).limit(100);
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des métriques système." });
  }
};

// Récupérer les métriques API
const getApiMetrics = async (req, res) => {
  try {
    const metrics = await MetricsModel.find({ type: "api" }).sort({ timestamp: -1 }).limit(100);
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des métriques API." });
  }
};

// Calculer les statistiques des temps de réponse pour les métriques API
const getApiResponseStats = async (req, res) => {
  try {
    const { endpoint } = req.query;

    // Construire la requête en fonction de l'endpoint, s'il est spécifié
    const query = { type: "api" };
    if (endpoint) {
      query.endpoint = endpoint;
    }

    // Récupérer toutes les métriques API correspondant à la requête
    const metrics = await MetricsModel.find(query);

    if (!metrics.length) {
      return res.status(404).json({ error: "Aucune métrique trouvée pour les critères spécifiés." });
    }

    // Calculer les temps de réponse min, max, et moyen
    const responseTimes = metrics.map((metric) => metric.responseTime);
    const minResponseTime = Math.min(...responseTimes);
    const maxResponseTime = Math.max(...responseTimes);
    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;

    res.json({
      endpoint: endpoint || "Tous les endpoints",
      totalRequests: responseTimes.length,
      minResponseTime: minResponseTime.toFixed(2),
      maxResponseTime: maxResponseTime.toFixed(2),
      avgResponseTime: avgResponseTime.toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du calcul des statistiques des métriques API." });
  }
};

module.exports = { 
  getSystemMetrics, 
  getApiMetrics, 
  getApiResponseStats 
};
