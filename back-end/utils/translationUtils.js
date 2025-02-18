// Traductions pour les couleurs
const colorTranslations = {
  'rouge': 'red', 'jaune': 'yellow', 'bleu': 'blue', 'vert': 'green',
  'blanc': 'white', 'noir': 'black', 'orange': 'orange',
  'marron': 'brown', 'or': 'gold', 'argent': 'silver',
  'rose': 'pink', 'violet': 'purple', 'turquoise': 'turquoise'
};

// Traductions pour les symboles
const symbolTranslations = {
  'étoile': 'star', 'croix': 'cross', 'cercle': 'circle',
  'triangle': 'triangle', 'rayures': 'stripes',
  'rayures diagonales': 'diagonal stripes', 'carré': 'square',
  'aigle': 'eagle', 'serpent': 'snake', 'lion': 'lion',
  'dragon': 'dragon', 'oiseau': 'bird', 'soleil': 'sun',
  'lune': 'moon', 'étoile filante': 'shooting star', 'arbre': 'tree',
  'fleur': 'flower', 'montagne': 'mountain', 'feuille': 'leaf',
  'arme': 'weapon', 'bouclier': 'shield', 'couronne': 'crown',
  'navire': 'ship', 'château': 'castle', 'main': 'hand',
  'pointe de lance': 'spear tip', 'chaîne': 'chain', 'hache': 'axe',
  'flamme': 'flame', 'croissant': 'crescent', 'croix chrétienne': 'Christian cross',
  'étoile de David': 'Star of David', 'Om': 'Om', 'Roue du Dharma': 'Wheel of Dharma',
  'griffon': 'griffin', 'phénix': 'phoenix', 'licorne': 'unicorn',
  'trident': 'trident', 'blason': 'coat of arms'
};

// Traductions pour les continents
const continentTranslations = {
  'afrique': 'Africa', 'asie': 'Asia', 'europe': 'Europe',
  'amérique du nord': 'North America', 'amérique du sud': 'South America',
  'océanie': 'Oceania', 'antarctique': 'Antarctica'
};

// Fonction utilitaire pour récupérer la traduction d'une couleur
const getColorTranslation = (query) => {
  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(colorTranslations)) {
    if (key.startsWith(lowerQuery) || value.startsWith(lowerQuery)) {
      return value; // Retourne la traduction en anglais
    }
  }
  return query; // Si pas de correspondance, retourne l'entrée d'origine
};

// Fonction utilitaire pour récupérer la traduction d'un symbole
const getSymbolTranslation = (query) => {
  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(symbolTranslations)) {
    if (key.startsWith(lowerQuery) || value.startsWith(lowerQuery)) {
      return value; // Retourne la traduction en anglais
    }
  }
  return query; // Si pas de correspondance, retourne l'entrée d'origine
};

// Fonction utilitaire pour récupérer la traduction d'un continent
const getContinentTranslation = (query) => {
  const lowerQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(continentTranslations)) {
    if (key.startsWith(lowerQuery) || value.toLowerCase().startsWith(lowerQuery)) {
      return value; // Retourne la traduction en anglais
    }
  }
  return query; // Si pas de correspondance, retourne l'entrée d'origine
};

module.exports = {
  getColorTranslation,
  getSymbolTranslation,
  getContinentTranslation,
};
