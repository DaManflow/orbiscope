// const mongoose = require('mongoose');

// // Connexion à MongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/aura5_poc', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie'))
//   .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// // Schéma et modèle Mongoose
// const countrySchema = new mongoose.Schema({
//   commonName: { type: String, required: true },
//   flagUrl: { type: String },
//   region: { type: String },
//   capital: { type: String },
// });

// const Country = mongoose.model('Country', countrySchema);

// // Liste des pays à insérer
// const countries = [
//   { commonName: 'France', flagUrl: 'https://flagcdn.com/fr.svg', region: 'Europe', capital: 'Paris' },
//   { commonName: 'Germany', flagUrl: 'https://flagcdn.com/de.svg', region: 'Europe', capital: 'Berlin' },
//   { commonName: 'Canada', flagUrl: 'https://flagcdn.com/ca.svg', region: 'Americas', capital: 'Ottawa' },
//   { commonName: 'Japan', flagUrl: 'https://flagcdn.com/jp.svg', region: 'Asia', capital: 'Tokyo' },
//   { commonName: 'Australia', flagUrl: 'https://flagcdn.com/au.svg', region: 'Oceania', capital: 'Canberra' },
//   { commonName: 'Brazil', flagUrl: 'https://flagcdn.com/br.svg', region: 'Americas', capital: 'Brasília' },
//   { commonName: 'India', flagUrl: 'https://flagcdn.com/in.svg', region: 'Asia', capital: 'New Delhi' },
//   { commonName: 'South Africa', flagUrl: 'https://flagcdn.com/za.svg', region: 'Africa', capital: 'Pretoria' },
//   { commonName: 'Egypt', flagUrl: 'https://flagcdn.com/eg.svg', region: 'Africa', capital: 'Cairo' },
//   { commonName: 'Italy', flagUrl: 'https://flagcdn.com/it.svg', region: 'Europe', capital: 'Rome' },
// ];

// // Insérer les pays
// (async function populate() {
//   try {
//     await Country.insertMany(countries);
//     console.log('Données insérées avec succès !');
//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Erreur lors de l\'insertion des données :', err);
//     mongoose.connection.close();
//   }
// })();