// =============================================================
// api.js — All external API integrations
//
//  TMDB          → Movie posters    (works on real domain, not localhost)
//  Open Library  → Book covers      (via Netlify serverless proxy)
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
//    Routed through our Netlify serverless function at
//    /.netlify/functions/bookcover to avoid rate limiting.
//    Searches by title and returns the first result with a cover.
// -------------------------------------------------------------
const bookCache = {};

export const fetchBookCover = async (title) => {
  if (bookCache[title] !== undefined) return bookCache[title];
  try {
    const res  = await fetch(
      `/.netlify/functions/bookcover?title=${encodeURIComponent(title)}`
    );
    const json = await res.json();
    const cover = json.cover ?? null;
    bookCache[title] = cover;
    return cover;
  } catch (err) {
    console.error("[BookCover] fetch error:", err);
    bookCache[title] = null;
    return null;
  }
};

export const fetchAllBookCovers = async (items) => {
  // Only fetch covers for books that don't already have a hardcoded imageUrl
  const books = items.filter((d) => d.type === "book" && !d.imageUrl);
  const results = await Promise.allSettled(
    books.map((d) => fetchBookCover(d.title))
  );
  const map = {};
  books.forEach((d, i) => {
    const val = results[i];
    if (val.status === "fulfilled" && val.value) {
      map[d.id] = val.value;
    }
  });
  return map;
};

// -------------------------------------------------------------
// 3. Comic Vine — Comics
//    Routed through our Netlify serverless function at
//    /.netlify/functions/comicvine to bypass CORS.
// -------------------------------------------------------------
const cvCache = {};

export const fetchComicCover = async (cvId) => {
  if (cvCache[cvId] !== undefined) return cvCache[cvId];
  try {
    const res  = await fetch(`/.netlify/functions/comicvine?cvId=${cvId}`);
    const json = await res.json();
    const cover = json.cover ?? null;
    cvCache[cvId] = cover;
    return cover;
  } catch (err) {
    console.error("[ComicVine] fetch error:", err);
    cvCache[cvId] = null;
    return null;
  }
};

export const fetchAllComicCovers = async (items) => {
  const comics = items.filter((d) => d.type === "comic" && d.cvId);
  const results = await Promise.allSettled(
    comics.map((d) => fetchComicCover(d.cvId))
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