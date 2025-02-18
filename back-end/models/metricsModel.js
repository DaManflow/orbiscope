const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "system" ou "api"
  endpoint: { type: String }, // Requis pour les métriques API
  method: { type: String }, // Requis pour les métriques API
  statusCode: { type: Number }, // Requis pour les métriques API
  responseTime: { type: Number }, // Requis pour les métriques API
  cpuUsage: { type: Number }, // Requis pour les métriques système
  memoryUsage: { type: Number }, // Requis pour les métriques système
  uptime: { type: Number }, // Requis pour les métriques système
  timestamp: { type: Date, default: Date.now }, // Timestamp pour les deux
});

module.exports = mongoose.model('Metrics', metricsSchema);
