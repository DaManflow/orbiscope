
# Orbiscope : Sélecteur multimodal - Du Texte à l'image  

Un sélecteur multimodal de drapeaux nationaux qui simplifie la recherche d'informations sur les pays du monde.


## Description 

**Orbiscope** est une application mobile et desktop qui permet de :

- Rechercher des pays à partir de requêtes textuelles ou vocales (nom, capitale, continent, code, couleur, symboles, etc.).

- Accéder rapidement aux informations détaillées sur les pays : nom officiel, capitale, population, langues et monnaies.

- Utiliser des filtres pour affiner les recherches. Exemples : Couleur, Symboles, Capitale ... 

Disponible en anglais, en français et espagnol, Orbiscope se distingue par son interface intuitive, son algorithme optimisé, et sa compatibilité multiplateforme.

###### Ce dépot est la **version mobile finale** de l'application.  

## Installation 

### Pré-requis : 

- Avoir **Node.js** installé sur votre machine. 
- Installer l'outil CLI de React Native :
``` 
npm install -g react-native-cli

```

### Étapes :

**1. Clonez le dépôt :** 

```
git clone https://gitlab.sorbonne-paris-nord.fr/12314691/aura-plus-5.git
cd aura-plus-5/front-end/AppMobile
```

**2. Installez les dépendances :** 

```
npm install
```
**3. Installer Android studio et le SDK convenable sur le site :**
   
 https://developer.android.com/studio/install?hl=fr 

**4. Assurez-vous** qu'un **émulateur Android** est lancé ou qu'un appareil est connecté avec :

```
adb devices
```
ou directement avec **l'interface d'Android Studio** dans la rubrique : **Virtual Device Manager** 

5. Se mettre dans **le répertoire back-end**, puis tapper la commande suivante pour démarrer le back-end : 

```
npm start
```
6. Se mettre dans **le répertoire front-end**, puis tapper la commande suivante pour lancer l'émulateur : 

```
npx react-native run-android  
```

## Technologies utilisées

- **Frontend :** React Native, JavaScript. 
- **Backend :** Node.js, Express.js.
- **Base de données :** MongoDB Atlas.
- **Cartes :** Google Maps et OpenStreetMap intégrés.

## Les branches du projet 

- **Main :** Représente la version finale de l'application mobile.
- **appMobile :** Contient les différentes versions de l'application mobile Orbiscope.
- **appDesktop :** Représente la version finale de l'application desktop.
- **poc :** Contient la version proof of concept (POC) du site web.
- **poc_desktop :** Contient le proof of concept (POC) de l'application desktop.
- **home_page :** Représente la branche où nous avons essayé d'intégrer la page d'accueil développée par Hiba.

## Équipe Aura+5

- Lydia Akmoussi 
- Nour Elhouda Bouamlat
- Papa Bassirou Diop
- Manon Glaude
- Lina Medani
- Hiba Oumsid
