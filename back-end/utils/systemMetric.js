const os = require('os');
const osUtils = require('os-utils');

const getSystemMetrics = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage((cpu) => {
      resolve({
        cpuUsage: cpu * 100, // CPU en pourcentage
        freeMemory: os.freemem() / (1024 * 1024), // Mémoire libre en Mo
        totalMemory: os.totalmem() / (1024 * 1024), // Mémoire totale en Mo
        usedMemory: (os.totalmem() - os.freemem()) / (1024 * 1024), // Mémoire utilisée
        uptime: os.uptime(), // Temps de fonctionnement du système
      });
    });
  });
};

module.exports = { getSystemMetrics };
