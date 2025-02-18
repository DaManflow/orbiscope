import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const MetricsDashboard = () => {
  const [apiMetrics, setApiMetrics] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const [apiResponse, systemResponse] = await Promise.all([
        fetch('http://192.168.1.15:5000/metrics/api/stats').then((res) => res.json()),
        fetch('http://192.168.1.15:5000/metrics/system').then((res) => res.json()),
      ]);

      setApiMetrics(apiResponse);
      setSystemMetrics(systemResponse); // Garder tous les points de données pour afficher les tendances
    } catch (error) {
      console.error('Erreur lors de la récupération des métriques:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des métriques...</Text>
      </View>
    );
  }

  if (!apiMetrics || systemMetrics.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>Impossible de récupérer les métriques.</Text>
      </View>
    );
  }

  // Préparer les données pour le graphique de tendances système
  const timestamps = systemMetrics.map((metric) =>
    new Date(metric.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const cpuUsages = systemMetrics.map((metric) => metric.cpuUsage || 0);
  const memoryUsages = systemMetrics.map((metric) => metric.memoryUsage || 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métriques API</Text>
      <BarChart
        data={{
          labels: ['Min', 'Moyenne', 'Max'],
          datasets: [
            {
              data: [
                parseFloat(apiMetrics.minResponseTime),
                parseFloat(apiMetrics.avgResponseTime),
                parseFloat(apiMetrics.maxResponseTime),
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f8f9fa',
          backgroundGradientTo: '#e9ecef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
        accessor="data"
        showValuesOnTopOfBars
      />

      <Text style={styles.title}>Tendances des métriques système</Text>
      <LineChart
        data={{
          labels: timestamps.slice(-5), // Afficher les 5 dernières entrées uniquement
          datasets: [
            {
              data: cpuUsages,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Rouge pour CPU
              strokeWidth: 2,
            },
            {
              data: memoryUsages,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Bleu pour Mémoire
              strokeWidth: 2,
            },
          ],
          legend: ['CPU Usage (%)', 'Memory Usage (MB)'],
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f8f9fa',
          backgroundGradientTo: '#e9ecef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MetricsDashboard;
