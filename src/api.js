// =============================================================
// api.js — All external API integrations
//
//  TMDB          → Movie posters    (pre-resolved in data.js)
//  Open Library  → Book covers      (pre-resolved in data.js)
//  Comic Vine    → Comic covers     (fetched via Netlify proxy at runtime)
//  RAWG          → Game covers      (add key when ready — stub below)
// =============================================================

// -------------------------------------------------------------
// 1. TMDB — Movies
//    The imageUrl values in data.js are already resolved TMDB URLs,
//    so no runtime fetch is needed. fetchMovie() is here if you
//    ever need to refresh them or look up a new title.
// -------------------------------------------------------------
const TMDB_KEY  = "ae53612a21670bc3c8004895f3a00cf9";
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG  = "https://image.tmdb.org/t/p/w500";

const tmdbCache = {};

export const fetchMovie = async (title, year) => {
  const cacheKey = `${title}-${year}`;
  if (tmdbCache[cacheKey]) return tmdbCache[cacheKey];
  try {
    const yearParam = year ? `&primary_release_year=${year}` : "";
    const res  = await fetch(
      `${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}${yearParam}`
    );
    const json = await res.json();
    const result = json.results?.[0] ?? null;
    if (result?.poster_path) result.posterUrl = `${TMDB_IMG}${result.poster_path}`;
    tmdbCache[cacheKey] = result;
    return result;
  } catch (err) {
    console.error("[TMDB] fetch error:", err);
    return null;
  }
};

// -------------------------------------------------------------
// 2. Open Library — Books
//    Cover URLs in data.js are already pre-resolved Open Library
//    URLs — no runtime fetch needed.
// -------------------------------------------------------------
export const getBookCoverUrl = (isbn, size = "L") =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;

// -------------------------------------------------------------
// 3. Comic Vine — Comics
//    Routed through our Netlify function at
//    /.netlify/functions/comicvine to bypass CORS.
//
//    Uses SEARCH (title + year) instead of hardcoded IDs so we
//    always find the right volume and never pull a wrong comic.
//    The function scores results by title match + year proximity
//    + publisher (Dark Horse / Marvel / Titan) to pick the best.
// -------------------------------------------------------------
const cvCache = {};

/**
 * Fetches a comic cover via the Netlify search proxy.
 * @param {string} cvSearch  - Volume name to search (e.g. "Aliens Dead Orbit")
 * @param {number} year      - Publication year — used to pick the right result
 * @returns {Promise<string|null>} proxied cover URL, or null on failure
 */
export const fetchComicCover = async (cvSearch, year) => {
  const cacheKey = `${cvSearch}-${year}`;
  if (cvCache[cacheKey] !== undefined) return cvCache[cacheKey];
  try {
    const params = new URLSearchParams({ cvSearch, year: String(year) });
    const res    = await fetch(`/.netlify/functions/comicvine?${params}`);
    const json   = await res.json();
    const cover  = json.cover ?? null;
    cvCache[cacheKey] = cover;
    return cover;
  } catch (err) {
    console.error("[ComicVine] fetch error:", err);
    cvCache[cacheKey] = null;
    return null;
  }
};

/**
 * Batch-fetches covers for all comic entries that have a cvSearch field.
 * Returns a map of { itemId → coverUrl }.
 * Uses Promise.allSettled so one failure never blocks the rest.
 */
export const fetchAllComicCovers = async (items) => {
  const comics = items.filter((d) => d.type === "comic" && d.cvSearch);
  const results = await Promise.allSettled(
    comics.map((d) => fetchComicCover(d.cvSearch, d.year))
  );
  const map = {};
  comics.forEach((d, i) => {
    const r = results[i];
    if (r.status === "fulfilled" && r.value) map[d.id] = r.value;
  });
  return map;
};

// -------------------------------------------------------------
// 4. RAWG — Games  (uncomment when you have the key)
// -------------------------------------------------------------
// const RAWG_KEY  = "YOUR_RAWG_KEY_HERE";
// const RAWG_BASE = "https://api.rawg.io/api";
// const rawgCache = {};
//
// export const fetchGameCover = async (title) => {
//   if (rawgCache[title]) return rawgCache[title];
//   try {
//     const res  = await fetch(`${RAWG_BASE}/games?key=${RAWG_KEY}&search=${encodeURIComponent(title)}&page_size=1`);
//     const json = await res.json();
//     const cover = json.results?.[0]?.background_image ?? null;
//     rawgCache[title] = cover;
//     return cover;
//   } catch (err) {
//     console.error("[RAWG] fetch error:", err);
//     return null;
//   }
// };
//
// export const fetchAllGameCovers = async (items) => {
//   const games = items.filter((d) => d.type === "game" && d.rawgSearch);
//   const results = await Promise.allSettled(games.map((d) => fetchGameCover(d.rawgSearch)));
//   const map = {};
//   games.forEach((d, i) => {
//     const r = results[i];
//     if (r.status === "fulfilled" && r.value) map[d.id] = r.value;
//   });
//   return map;
// };
