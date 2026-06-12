# Alien World — Franchise Archive

A React web app for browsing the full Alien franchise across films, games, books, and comics.
Features Firebase authentication, Firestore-backed favourites, live API data, filtering, sorting, and detailed modal views.

---

## Project Structure

```
src/
├── App.js                        # Auth routing (Login ↔ Home)
├── App.css
├── index.js
├── index.css                     # CSS variables & global styles
├── firebase.js                   # Firebase app init
├── api.js                        # All API calls (TMDB, RAWG, Comic Vine, Open Library)
├── data.js                       # All 63 franchise entries
│
├── hooks/
│   └── useFavorites.js           # Firestore favourites read/write
│
├── pages/
│   ├── Home.js                   # Main archive page
│   ├── Home.module.css
│   ├── Login.js                  # Login / register screen
│   └── Login.module.css
│
└── components/
    ├── Card.js                   # Poster card with live rating
    ├── Card.module.css
    ├── Modal.js                  # Detail modal with live description and score
    ├── Modal.module.css
    ├── Controls.js               # Filter / sort / search bar
    ├── Controls.module.css
    ├── FavoriteButton.js         # Star button component
    └── FavoriteButton.module.css

netlify/
└── functions/
    ├── tmdb.js                   # TMDB API proxy (movies)
    ├── rawg.js                   # RAWG API proxy (games)
    ├── bookcover.js              # Open Library proxy (books)
    └── comicvine.js              # Comic Vine proxy + image proxy (comics)

firestore.rules                   # Firestore security rules
netlify.toml                      # Netlify build and functions config
```

---

## Prerequisites

- Node.js 16+ and npm
- A Firebase project (free Spark plan is fine)
- A Netlify account
- Netlify CLI: `npm install -g netlify-cli`

---

## 1 — Install dependencies

```bash
npm install
```

---

## 2 — Firebase setup

### Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** and follow the steps
3. In **Project Settings → General**, scroll to **Your apps** and click the `</>` web icon
4. Register your app and copy the config values

### Enable Authentication

1. In Firebase console go to **Authentication → Sign-in method**
2. Enable **Email/Password**

### Enable Firestore

1. Go to **Firestore Database → Create database**
2. Start in **production mode**

### Deploy Firestore security rules

Paste the contents of `firestore.rules` into **Firebase console → Firestore → Rules**, or deploy via CLI:

```bash
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

---

## 3 — Environment variables

Create a `.env.local` file in the project root and add the following:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

TMDB_KEY=your_tmdb_api_key
RAWG_KEY=your_rawg_api_key
CV_KEY=your_comic_vine_api_key
```

This file is already in `.gitignore` and will never be uploaded to GitHub.

For production, add the same variables in **Netlify → Site Settings → Environment Variables**.

---

## 4 — API keys

| API | Where to get it |
|---|---|
| TMDB | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| RAWG | [rawg.io/apidocs](https://rawg.io/apidocs) |
| Comic Vine | [comicvine.gamespot.com/api](https://comicvine.gamespot.com/api) |
| Open Library | No key needed |

---

## 5 — Run locally

```bash
netlify dev
```

This starts the app at `http://localhost:8888` with Netlify Functions running alongside it. Do not use `npm start` as the functions will not work without Netlify's local server.

---

## 6 — Deploy to Netlify

Connect your GitHub repository to Netlify and it will deploy automatically on every push. Make sure all environment variables are set in the Netlify dashboard before deploying.

```bash
# Or deploy manually
netlify deploy --prod
```

---

## Features

| Feature | Details |
|---|---|
| **Auth** | Email/password login and registration via Firebase Auth |
| **63 entries** | 10 films, 8 games, 15 books, 20 comics |
| **Live posters** | Fetched at runtime from TMDB, RAWG, Open Library, and Comic Vine |
| **Live scores** | Movies from TMDB, games from RAWG — fetched progressively in background |
| **Live descriptions** | Fetched on demand when a card is opened |
| **Filter by type** | Films, Games, Books, Comics — or show all |
| **Favourites** | Per-user saved list stored in Firestore, persists across sessions |
| **Sort** | By year (asc/desc), rating (asc/desc), or A-Z |
| **Search** | Instant search across titles, descriptions, and tags |
| **Detail modal** | Poster, live synopsis, score, genres, runtime, and tags |
| **Responsive** | Works on mobile — poster column hides on small screens |

---

## Adding new entries

Open `src/data.js` and add an object to the `data` array:

```js
{
  id: 65,                          // must be unique
  type: 'movie',                   // 'movie' | 'game' | 'book' | 'comic'
  title: 'Alien: New Film',
  year: 2026,
  director: 'Some Director',       // or: author / developer
  imageUrl: 'https://...',         // poster URL — leave null for emoji fallback
  desc: 'Short synopsis...',       // fallback if API returns nothing
  tags: ['Horror', 'Sci-Fi'],
  // for games:
  rawgSearch: 'Search title for RAWG',
  // for comics:
  cvId: 12345,                     // Comic Vine volume ID
}
```

---

## Tech stack

- **React 18** (Create React App)
- **Firebase 9** (Auth + Firestore)
- **Netlify Functions** (Node.js serverless — API proxy and key security)
- **CSS Modules** — no CSS-in-JS, no Tailwind
- **Google Fonts** — Bebas Neue, Share Tech Mono, Rajdhani
- **APIs** — TMDB, RAWG, Comic Vine, Open Library
