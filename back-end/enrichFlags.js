const mongoose = require('mongoose');
require('dotenv').config();
const Country = require('./models/countryModel'); // Modèle de votre pays

// Définir des couleurs et des symboles communs avec leurs traductions
const COLORS = [
  { en: "red", fr: "rouge" },
  { en: "yellow", fr: "jaune" },
  { en: "blue", fr: "bleu" },
  { en: "green", fr: "vert" },
  { en: "white", fr: "blanc" },
  { en: "black", fr: "noir" },
  { en: "orange", fr: "orange" },
  { en: "brown", fr: "marron" },
  { en: "gold", fr: "or" },
  { en: "silver", fr: "argent" },
  { en: "pink", fr: "rose" },
  { en: "purple", fr: "violet" },
  { en: "turquoise", fr: "turquoise" }
];

const SYMBOLS = [
  { en: "star", fr: "étoile" },
  { en: "cross", fr: "croix" },
  { en: "circle", fr: "cercle" },
  { en: "triangle", fr: "triangle" },
  { en: "stripes", fr: "rayures" },
  { en: "diagonal stripes", fr: "rayures diagonales" },
  { en: "square", fr: "carré" },
  { en: "eagle", fr: "aigle" },
  { en: "snake", fr: "serpent" },
  { en: "lion", fr: "lion" },
  { en: "dragon", fr: "dragon" },
  { en: "bird", fr: "oiseau" },
  { en: "sun", fr: "soleil" },
  { en: "moon", fr: "lune" },
  { en: "shooting star", fr: "étoile filante" },
  { en: "tree", fr: "arbre" },
  { en: "flower", fr: "fleur" },
  { en: "mountain", fr: "montagne" },
  { en: "leaf", fr: "feuille" },
  { en: "weapon", fr: "arme" },
  { en: "shield", fr: "bouclier" },
  { en: "crown", fr: "couronne" },
  { en: "ship", fr: "navire" },
  { en: "castle", fr: "château" },
  { en: "hand", fr: "main" },
  { en: "spear tip", fr: "pointe de lance" },
  { en: "chain", fr: "chaîne" },
  { en: "axe", fr: "hache" },
  { en: "flame", fr: "flamme" },
  { en: "crescent", fr: "croissant" },
  { en: "Christian cross", fr: "croix chrétienne" },
  { en: "Star of David", fr: "étoile de David" },
  { en: "Om", fr: "Om" },
  { en: "Wheel of Dharma", fr: "Roue du Dharma" },
  { en: "griffin", fr: "griffon" },
  { en: "phoenix", fr: "phénix" },
  { en: "unicorn", fr: "licorne" },
  { en: "trident", fr: "trident" },
  { en: "coat of arms", fr: "blason" }
];

// Fonction pour extraire les couleurs et symboles d'une description
function extractFeatures(description) {
  const colors = [];
  const symbols = [];

  const cleanedDescription = description.toLowerCase().replace(/\bis centered\b/g, ''); // Évite les faux positifs comme "centered" contenant "red"
  // Logs pour inspecter la description nettoyée
  console.log(`Description nettoyée : ${cleanedDescription}`);

  // Rechercher les couleurs dans la description
  COLORS.forEach(({ en, fr }) => {
    if (cleanedDescription.includes(en) || cleanedDescription.includes(fr)) {
      colors.push(en); // Stocker la version anglaise pour uniformité
    }
  });

  // Rechercher les symboles dans la description
  SYMBOLS.forEach(({ en, fr }) => {
    if (cleanedDescription.includes(en) || cleanedDescription.includes(fr)) {
      symbols.push(en); // Stocker la version anglaise pour uniformité
    }
  });

  return { colors, symbols };
}

// Fonction principale pour enrichir les documents
async function enrichFlags() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecté à MongoDB');
    
    // Supprimer les anciennes données pour garantir un enrichissement propre
    await Country.updateMany({ 'flags.alt': { $exists: true } }, { $unset: { colors: "", symbols: "" } });
    console.log('Données précédentes nettoyées');

    // Récupérer tous les pays de la base de données
    const countries = await Country.find();
    console.log(`Nombre de pays trouvés : ${countries.length}`);

    // Pour chaque pays, analyser la description du drapeau et enrichir les données
    for (const country of countries) {
      const { alt } = country.flags;  // Accéder à la description du drapeau

      if (!alt) {
        console.log(`Pas de description pour le pays : ${country.commonName}`);
        continue;
      }

      // Extraire les couleurs et les symboles de la description
      const { colors, symbols } = extractFeatures(alt);

      // Mettre à jour le document avec les couleurs et les symboles
      country.colors = colors;
      country.symbols = symbols;

      // Sauvegarder les modifications
      await country.save();
      console.log(`Pays mis à jour : ${country.commonName}`);
    }

    console.log('Enrichissement terminé');
  } catch (error) {
    console.error('Erreur lors de l\'enrichissement :', error.message);
  } finally {
    mongoose.connection.close();
  }
}

// Exécution de la fonction
enrichFlags();
