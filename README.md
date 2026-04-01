# ALIEN — Franchise Archive

A React web app for browsing the full Alien franchise across films, games, books, and comics.
Features Firebase authentication, Firestore-backed favorites, filtering, sorting, and detailed modal views.

---

## Project Structure

```
src/
├── App.js                        # Auth routing (Login ↔ Home)
├── App.css
├── index.js
├── index.css                     # CSS variables & global styles
├── firebase.js                   # Firebase app init
├── api.js                        # TMDB API helper (optional)
├── data.js                       # All 47 franchise entries
│
├── hooks/
│   └── useFavorites.js           # Firestore favorites read/write
│
├── pages/
│   ├── Home.js                   # Main archive page
│   ├── Home.module.css
│   ├── Login.js                  # Login / register screen
│   └── Login.module.css
│
└── components/
    ├── Card.js                   # Poster card with hover reveal
    ├── Card.module.css
    ├── Modal.js                  # Detail modal with pros/cons
    ├── Modal.module.css
    ├── Controls.js               # Filter / sort / search bar
    ├── Controls.module.css
    ├── FavoriteButton.js         # Star button component
    └── FavoriteButton.module.css

firestore.rules                   # Firestore security rules
```

---

## Prerequisites

- Node.js 16+ and npm
- A Firebase project (free Spark plan is fine)

---

## 1 — Install dependencies

```bash
npm install
npm install firebase
```

---

## 2 — Firebase setup

### Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → follow the steps
3. In **Project Settings → General**, scroll to **Your apps** and click the `</>` web icon
4. Register your app and copy the config object

### Paste config into `src/firebase.js`

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

> **Security tip:** For production, move these values to a `.env` file:
>
> ```
> REACT_APP_FIREBASE_API_KEY=...
> REACT_APP_FIREBASE_AUTH_DOMAIN=...
> REACT_APP_FIREBASE_PROJECT_ID=...
> ```
>
> Then reference them in `firebase.js` as `process.env.REACT_APP_FIREBASE_API_KEY`.

### Enable Authentication

1. In Firebase console → **Authentication → Sign-in method**
2. Enable **Email/Password**

### Enable Firestore

1. **Firestore Database → Create database**
2. Start in **production mode** (you'll apply rules next)

### Deploy Firestore security rules

```bash
npm install -g firebase-tools
firebase login
firebase init firestore   # select your project
firebase deploy --only firestore:rules
```

Or paste the contents of `firestore.rules` directly into the **Firebase console → Firestore → Rules** tab:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 3 — (Optional) TMDB API for live poster images

The app uses static Wikipedia poster URLs by default. If you want live TMDB posters:

1. Create an account at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API** and generate an API key
3. In `src/api.js`, replace `YOUR_TMDB_API_KEY` with your key
4. Call `fetchMovie(title)` in your components to retrieve live poster data

---

## 4 — Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## 5 — Build for production

```bash
npm run build
```

Deploy the `build/` folder to any static host:

```bash
# Firebase Hosting (recommended — same project)
firebase init hosting
firebase deploy --only hosting

# Or Vercel
npx vercel --prod

# Or Netlify
npx netlify deploy --prod --dir=build
```

---

## Features

| Feature | Details |
|---|---|
| **Auth** | Email/password login and registration via Firebase Auth |
| **47 entries** | 7 films, 8 games, 15 books, 17 comics — all with ratings, descriptions, and pros/cons |
| **Poster images** | Static Wikipedia poster URLs with graceful emoji fallback |
| **Filter by type** | Films, Games, Books, Comics — or show all |
| **★ Favorites** | Per-user saved list stored in Firestore, persists across sessions |
| **Sort** | By year (asc/desc), rating (asc/desc), or A–Z |
| **Search** | Instant search across titles, descriptions, and tags |
| **Detail modal** | Poster, synopsis, detailed notes, public pros/cons, genre tags |
| **Responsive** | Works on mobile — poster column hides on small screens |

---

## Adding new entries

Open `src/data.js` and add an object to the `data` array following this shape:

```js
{
  id: 48,                          // must be unique
  type: 'movie',                   // 'movie' | 'game' | 'book' | 'comic'
  title: 'Alien: New Film',
  year: 2026,
  rating: 8.0,                     // out of 10
  director: 'Some Director',       // or: author / developer
  imageUrl: 'https://...',         // poster URL — leave '' for emoji fallback
  desc: 'Short synopsis...',
  detailedDesc: 'Longer description...',
  pros: ['Pro 1', 'Pro 2', 'Pro 3'],
  cons: ['Con 1', 'Con 2', 'Con 3'],
  tags: ['Horror', 'Sci-Fi'],
}
```

Remember to update the stat counters in `Home.js` if you add a new type category.

---

## Tech stack

- **React 18** (Create React App)
- **Firebase 9** (Auth + Firestore)
- **CSS Modules** — no CSS-in-JS, no Tailwind
- **Google Fonts** — Bebas Neue, Share Tech Mono, Rajdhani
