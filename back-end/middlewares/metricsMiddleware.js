const MetricsModel = require('../models/metricsModel');

const logApiMetrics = async (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    const responseTime = Date.now() - start;

    const metric = {
      type: "api",
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: responseTime.toFixed(2),
      timestamp: new Date(),
    };

    try {
      await MetricsModel.create(metric);
    } catch (error) {
      console.error('Erreur lors de l’enregistrement des métriques API :', error);
    }
  });

  next();
};

module.exports = logApiMetrics;
