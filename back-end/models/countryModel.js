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
  languages: [
    {
      code: { type: String },
      name: { type: String },
    },
  ],
  population: { type: Number, default: 0 },
  gini: { type: Map, of: Number, default: {} },
  translations: {
    french: { type: String },
    english: { type: String },
    spanish: { type: String },
  },
  flags: {
    png: { type: String },
    svg: { type: String },
    alt: { type: String },
  },
  colors: {
    type: [String],
    default: [],
  },
  symbols: {
    type: [String],
    default: [],
  },
  maps: {
    googleMaps: { type: String, default: 'N/A' },
    openStreetMaps: { type: String, default: 'N/A' },
  },
  timezones: {
    type: [String],
    default: [],
  },
  coatOfArms: {
    png: { type: String, default: 'N/A' },
    svg: { type: String, default: 'N/A' },
  },
  demonyms: {
    eng: {
      f: { type: String, default: 'N/A' },
      m: { type: String, default: 'N/A' },
    },
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
