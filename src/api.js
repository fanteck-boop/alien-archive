// =============================================================
// api.js — All external API integrations
//
//  TMDB          → Movie posters    (works on real domain, not localhost)
//  Open Library  → Book covers      (no key needed, works everywhere)
//  Comic Vine    → Comic covers     (via Netlify serverless proxy)
// =============================================================

// -------------------------------------------------------------
// 1. TMDB — Movies
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
    if (result?.poster_path) {
      result.posterUrl = `${TMDB_IMG}${result.poster_path}`;
    }
    tmdbCache[cacheKey] = result;
    return result;
  } catch (err) {
    console.error("[TMDB] fetch error:", err);
    return null;
  }
};

/**
 * Batch-fetches TMDB posters for all movie entries.
 * Returns a map of { id → posterUrl }.
 * Falls back gracefully — a failed fetch just keeps the existing imageUrl.
 */
export const fetchAllMoviePosters = async (items) => {
  const movies = items.filter((d) => d.type === "movie");
  const results = await Promise.allSettled(
    movies.map((d) => fetchMovie(d.title, d.year))
  );
  const map = {};
  movies.forEach((d, i) => {
    const val = results[i];
    if (val.status === "fulfilled" && val.value?.posterUrl) {
      map[d.id] = val.value.posterUrl;
    }
  });
  return map;
};

// -------------------------------------------------------------
// 2. Open Library — Books
//    No API key needed. Cover IDs are stored in data.js as
//    imageUrl already, so no fetch is needed at runtime.
//    This helper is here if you ever need to look up by ISBN.
// -------------------------------------------------------------
export const getBookCoverUrl = (isbn, size = "L") =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;

// -------------------------------------------------------------
// 3. Comic Vine — Comics
//    Routed through our Netlify serverless function at
//    /.netlify/functions/comicvine to bypass CORS.
// -------------------------------------------------------------
const cvCache = {};

/**
 * Fetches a comic cover via the Netlify proxy function.
 * @param {number} cvId - Comic Vine volume ID (stored in data.js as cvId)
 */
const normalizeText = (s = '') =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const isTitleMatch = (expected = '', actual = '') => {
  const normExpected = normalizeText(expected);
  const normActual = normalizeText(actual);
  if (!normExpected || !normActual) return false;
  const expectedTokens = normExpected.split(' ').filter(Boolean);
  const hitTokens = expectedTokens.slice(0, 4);
  return hitTokens.every((token) => normActual.includes(token));
};

export const fetchComicCover = async (cvId, expectedTitle) => {
  const cacheKey = `${cvId}::${normalizeText(expectedTitle)}`;
  if (cvCache[cacheKey] !== undefined) return cvCache[cacheKey];
  try {
    const res = await fetch(`/.netlify/functions/comicvine?cvId=${cvId}`);
    const json = await res.json();
    const cover = json.cover ?? null;
    const returnedName = json.name || json.title || '';

    if (cover && expectedTitle && !isTitleMatch(expectedTitle, returnedName)) {
      console.warn(
        `[ComicVine] title mismatch for cvId=${cvId}: expected='${expectedTitle}', actual='${returnedName}'`
      );
      cvCache[cacheKey] = null;
      return null;
    }

    cvCache[cacheKey] = cover;
    return cover;
  } catch (err) {
    console.error("[ComicVine] fetch error:", err);
    cvCache[cacheKey] = null;
    return null;
  }
};

/**
 * Batch-fetches Comic Vine covers for all comic entries that have a cvId.
 * Returns a map of { id → coverUrl }.
 */
export const fetchAllComicCovers = async (items) => {
  const comics = items.filter((d) => d.type === "comic" && d.cvId);
  const results = await Promise.allSettled(
    comics.map((d) => fetchComicCover(d.cvId, d.title))
  );
  const map = {};
  comics.forEach((d, i) => {
    const val = results[i];
    if (val.status === "fulfilled" && val.value) {
      map[d.id] = val.value;
    }
  });
  return map;
};