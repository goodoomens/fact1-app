<img alt="Schlitterio Logo" src="src/assets/fact1_logo.png" width="20%" />

# Fact1 - F1 App

[![Netlify Status](https://api.netlify.com/api/v1/badges/31493c86-691a-4511-9260-63e6dfa3b3a4/deploy-status)](https://app.netlify.com/sites/fact1/deploys)

In order to follow the current Formula 1 season I wrote this simple, fast and most importantly mobile friendly app.

**[Live Demo](https://fact1.netlify.app/)**

### App mechanics

- Fetches data from **[Ergast Developer API](https://ergast.com/mrd/)**
- View event data & schedule (past, current & upcoming events)
- View driver standings and compare two drivers by clicking their card
- View constructor standings
- Settings menu for language, units and theme
- Controllable with keyboard

### Controls

| Key                | Function                         |
| :----------------- | :------------------------------- |
| Arrow left / right | Switch views                     |
| Arrow up / down    | Open previous / next event card  |
| Spacebar           | Collapse & uncollpase event view |
| Escape             | Close active additional views    |

### ToDos

- Constructor standings view to match driver standings aestethics
- Cache server with database to avoid unnecessary API calls
- Save settings to local browser storage
- Minify / convert assets
- More languages

### Installation

In order to run your own version, you can follow these steps:

```
// Clone repo
git clone https://github.com/goodoomens/fact1-app

// Go into cloned directory
cd fact1-app

// Install dependencies
npm install

// Run local dev server
npm run serve

// Open browser
http://localhost:<port>
```

---

Made with ♥
