import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1ECEC',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20, // Ajustez ou réduisez cet espace si nécessaire
    marginTop: -5, // Ajoute une marge négative pour remonter légèrement
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: '#333',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  countriesList: {
    paddingBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flagImage: {
    width: 40,
    height: 30,
    borderRadius: 5,
  },
  countryText: {
    marginLeft: 15,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  countryPopulation: {
    fontSize: 14,
    color: '#666',
  },
  // Styles pour la modale
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  listItemText: {
    fontWeight: 'bold',
    color: '#333',
  },
  listItemValue: {
    color: '#555',
  },
  flagImageLarge: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  // Style pour le blason
  coatOfArmsImage: {
    width: 100, // Taille de l'image
    height: 100,
    resizeMode: 'contain', // Maintient le ratio
    alignSelf: 'center', // Centre l'image horizontalement
    marginVertical: 10, // Espacement vertical autour de l'image
  },
  
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10, // Ajusté pour donner un peu d'espace
  },
  mapButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  googleMapsButton: {
    backgroundColor: '#34A853',
  },
  openStreetMapButton: {
    backgroundColor: '#5A5A5A',
  },
  closeButton: {
    alignSelf: 'center',
    marginVertical: 20, // Assure une bonne séparation des autres éléments
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FF5A5F',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10, // Réduit l'espace sous les boutons
    paddingHorizontal: 10,
  },
  
  
  filterButton: {
    flexGrow: 1, // Permet aux boutons de s'étendre également
    marginHorizontal: 5, // Espace horizontal entre les boutons
    marginVertical: 8, // Espace vertical entre les lignes de boutons
    paddingVertical: 10, // Espace interne vertical pour agrandir les boutons
    paddingHorizontal: 15, // Espace interne horizontal pour un bouton plus large
    borderRadius: 20, // Forme arrondie
    backgroundColor: '#FFF', // Couleur de fond blanche
    borderWidth: 1, // Bordure fine
    borderColor: '#CCC', // Couleur de bordure grise
    alignItems: 'center', // Centre le texte horizontalement
  },
  
  activeFilter: {
    borderColor: '#007BFF', // Bordure bleue pour le filtre actif
    backgroundColor: '#E6F0FF', // Fond légèrement bleu pour le filtre actif
  },
  
  filterText: {
    fontSize: 14, // Taille de texte légèrement réduite
    color: '#333', // Couleur de texte foncée
    textAlign: 'center',
  },
  metricsButton: {
    backgroundColor: '#4CAF50', // Couleur de fond verte
    paddingVertical: 15, // Espacement vertical interne
    paddingHorizontal: 20, // Espacement horizontal interne
    borderRadius: 8, // Coins arrondis
    alignItems: 'center', // Centrage du texte
    marginVertical: 10, // Espacement vertical
    marginHorizontal: 20, // Espacement horizontal
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Position de l'ombre
    shadowOpacity: 0.2, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 3, // Élévation pour Android
  },
  
  metricsButtonText: {
    color: '#FFF', // Couleur du texte en blanc
    fontSize: 16, // Taille du texte
    fontWeight: 'bold', // Texte en gras
  },
  
  backButton: {
    backgroundColor: '#FF5722', // Couleur de fond rouge orangé
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default styles;
