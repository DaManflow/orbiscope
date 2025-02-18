const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  commonName: { type: String, required: true },
  officialName: { type: String },
  flagUrl: { type: String },
  region: { type: String },
  capital: { type: String },
  continent: { type: String },
  countryCode: { type: String },
  currencies: [
    {
      code: { type: String },
      name: { type: String },
      symbol: { type: String },
    },
  ],
  languages: [String],
  translations: {
    french: { type: String },
    english: { type: String },
    spanish: { type: String },
  },
  flags: {
    png: { type: String },
    svg: { type: String },
    alt: { type: String }, // Description textuelle du drapeau
  },
  colors: { 
    type: [String], // Tableau de couleurs extraites du champ alt
    default: [] 
  },
  symbols: { 
    type: [String], // Tableau de symboles extraits du champ alt
    default: [] 
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
