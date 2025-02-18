 const API_BASE_URL = 'http://localhost:3000/countries';

// Charger tous les pays
async function fetchCountries() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Erreur lors du chargement des pays');
    const countries = await response.json();

    const countriesList = document.querySelector('.countries-list');
    countriesList.innerHTML = ''; // Réinitialiser la liste

    countries.forEach(country => {
      const countryDiv = document.createElement('div');
      countryDiv.className = 'country';
      countryDiv.innerHTML = `
        <img src="${country.flagUrl}" alt="${country.commonName}">
        <p>${country.commonName}</p>
      `;
      countriesList.appendChild(countryDiv);
    });
  } catch (err) {
    console.error(err);
  }
}

// Recherche dynamique
document.querySelector('#country-search').addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
    if (!response.ok) throw new Error('Erreur lors de la recherche');
    const countries = await response.json();

    const countriesList = document.querySelector('.countries-list');
    countriesList.innerHTML = ''; // Réinitialiser la liste

    countries.forEach(country => {
      const countryDiv = document.createElement('div');
      countryDiv.className = 'country';
      countryDiv.innerHTML = `
        <img src="${country.flagUrl}" alt="${country.commonName}">
        <p>${country.commonName}</p>
      `;
      countriesList.appendChild(countryDiv);
    });
  } catch (err) {
    console.error(err);
  }
});

// Charger les pays au démarrage
// fetchCountries();
