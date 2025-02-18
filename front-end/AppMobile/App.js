import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Modal, ScrollView, Linking } from 'react-native';
import styles from './styles'; // Import the styles
import MetricsDashboard from './MetricDashboard'; // Import the metrics dashboard component

const App = () => {
  const [screen, setScreen] = useState('countries'); // State to toggle between screens
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected country
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [filter, setFilter] = useState('name'); // Selected filter
1
  const API_BASE_URL = 'http://192.168.1.15:5000/api/countries';

  // Dynamic search
  useEffect(() => {
    const searchCountries = async () => {
      try {
        const query = searchQuery.trim();
        const filterParam = filter ? `&filter=${filter}` : ''; // Add the filter to the query
        const response = await fetch(`${API_BASE_URL}/search?q=${query}${filterParam}`);
        if (!response.ok) throw new Error('Error fetching countries');
        const data = await response.json();
        setFilteredCountries(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (searchQuery.trim()) {
      searchCountries();
    } else {
      setFilteredCountries([]);
    }
  }, [searchQuery, filter]); // Run search on filter or query change

  const handleCountryPress = (country) => {
    setSelectedCountry(country);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCountryPress(item)} style={styles.countryItem}>
      <Image source={{ uri: item.flags.png }} style={styles.flagImage} />
      <View style={styles.countryText}>
        <Text style={styles.countryName}>{item.commonName}</Text>
        <Text style={styles.countryPopulation}>Population: {item.population}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCountriesScreen = () => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'name' && styles.activeFilter]}
          onPress={() => setFilter('name')}
        >
          <Text style={styles.filterText}>Nom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'capital' && styles.activeFilter]}
          onPress={() => setFilter('capital')}
        >
          <Text style={styles.filterText}>Capitale</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'continent' && styles.activeFilter]}
          onPress={() => setFilter('continent')}
        >
          <Text style={styles.filterText}>Continent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'code' && styles.activeFilter]}
          onPress={() => setFilter('code')}
        >
          <Text style={styles.filterText}>Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'color' && styles.activeFilter]}
          onPress={() => setFilter('color')}
        >
          <Text style={styles.filterText}>Couleur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'symbol' && styles.activeFilter]}
          onPress={() => setFilter('symbol')}
        >
          <Text style={styles.filterText}>Symbole</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Image source={require('./assets/images/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Rechercher par ${filter}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.countryCode}
        contentContainerStyle={styles.countriesList}
      />

      {selectedCountry && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.flagContainer}>
                <Image source={{ uri: selectedCountry.flags.png }} style={styles.flagImageLarge} />
                <Text style={styles.modalTitle}>{selectedCountry.commonName}</Text>
              </View>
              <View style={styles.list}>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Nom officiel:</Text>
                  <Text style={styles.listItemValue}>{selectedCountry.officialName || 'N/A'}</Text>
                </View>
                {/* Other country details */}
                  <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Capitale:</Text>
                  <Text style={styles.listItemValue}>{selectedCountry.capital || 'N/A'}</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Population:</Text>
                  <Text style={styles.listItemValue}>{selectedCountry.population || 'N/A'}</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Langues:</Text>
                  <Text style={styles.listItemValue}>
                    {selectedCountry.languages?.map((lang) => lang.name).join(', ') || 'N/A'}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Monnaies:</Text>
                  <Text style={styles.listItemValue}>
                    {selectedCountry.currencies?.map((curr) => `${curr.name} (${curr.symbol})`).join(', ') || 'N/A'}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Fuseaux horaires:</Text>
                  <Text style={styles.listItemValue}>
                    {selectedCountry.timezones?.join(', ') || 'Non disponible'}
                  </Text>
                </View>
              </View>

              {/* Blason */}
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>Blason:</Text>
                {selectedCountry.coatOfArms?.png && selectedCountry.coatOfArms.png !== 'N/A' ? (
                  <Image
                    source={{ uri: selectedCountry.coatOfArms.png }}
                    style={styles.coatOfArmsImage}
                  />
                ) : (
                  <Text style={styles.listItemValue}>Non disponible</Text>
                )}
              </View>

              {/* Boutons pour les cartes */}
              <View style={styles.buttonBar}>
                <TouchableOpacity
                  style={[styles.mapButton, styles.googleMapsButton]}
                  onPress={() => Linking.openURL(selectedCountry.maps.googleMaps)}
                >
                  <Text style={{ color: '#fff' }}>Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mapButton, styles.openStreetMapButton]}
                  onPress={() => Linking.openURL(selectedCountry.maps.openStreetMaps)}
                >
                  <Text style={{ color: '#fff' }}>OpenStreetMap</Text>
                </TouchableOpacity>
 
                
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {screen === 'countries' ? (
        <>
          {renderCountriesScreen()}
          <TouchableOpacity
            style={styles.metricsButton}
            onPress={() => setScreen('metrics')}
          >
            <Text style={styles.metricsButtonText}>Voir les métriques</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <MetricsDashboard />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen('countries')}
          >
            <Text style={styles.backButtonText}>Retour aux pays</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default App;
