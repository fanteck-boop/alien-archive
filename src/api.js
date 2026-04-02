// =============================================================
// api.js — All external API integrations
//
//  TMDB          → Movie posters & metadata
//  Open Library  → Book covers via ISBN  (no key needed)
//  Comic Vine    → Comic volume covers   (key required)
//  RAWG          → Game covers           (add key when ready)
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

// -------------------------------------------------------------
// 2. Open Library (Internet Archive) — Books
//    No API key needed.
//    Usage: getBookCoverUrl("9781785658037") → direct <img src>
// -------------------------------------------------------------
const OL_BASE = "https://covers.openlibrary.org/b/isbn";

/** Returns a cover URL for a given ISBN. Synchronous — no fetch needed. */
export const getBookCoverUrl = (isbn, size = "L") =>
  `${OL_BASE}/${isbn}-${size}.jpg`;

/** Fetches full book metadata (title, authors, publish_date, etc.) */
export const fetchBookData = async (isbn) => {
  try {
    const res  = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    const json = await res.json();
    return json[`ISBN:${isbn}`] ?? null;
  } catch (err) {
    console.error("[OpenLibrary] fetch error:", err);
    return null;
  }
};

// -------------------------------------------------------------
// 3. Comic Vine — Comics
//
//    Comic Vine blocks direct browser requests (no CORS headers),
//    so we route through corsproxy.io. For production, swap
//    CORS_PROXY for your own backend endpoint.
//
//    We search by volume name and return the cover image URL.
//    Results are cached in memory for the session.
// -------------------------------------------------------------
const CV_KEY   = "11a97461452eee00cc36984e0956bc6565729625";
const CV_BASE  = "https://comicvine.gamespot.com/api";
const CV_PROXY = "https://corsproxy.io/?";

const cvCache = {};

/**
 * Searches Comic Vine for a volume by name and returns its cover image URL.
 * Falls back to null if not found or on error.
 *
 * @param {string} volumeName  - The comic volume title to search for
 * @param {number} [cvId]      - Optional: Comic Vine volume ID for exact lookup
 * @returns {Promise<string|null>}
 */
export const fetchComicCover = async (volumeName, cvId) => {
  const cacheKey = cvId ?? volumeName;
  if (cvCache[cacheKey] !== undefined) return cvCache[cacheKey];

  try {
    let url;

    if (cvId) {
      // Exact lookup by ID — more reliable, avoids wrong search results
      url = `${CV_BASE}/volume/4050-${cvId}/?api_key=${CV_KEY}&format=json&field_list=id,name,image`;
    } else {
      // Name search — returns first match
      url = `${CV_BASE}/volumes/?api_key=${CV_KEY}&format=json&filter=name:${encodeURIComponent(volumeName)}&field_list=id,name,image&limit=1`;
    }

    const res  = await fetch(`${CV_PROXY}${encodeURIComponent(url)}`);
    const json = await res.json();

    const imageObj = cvId
      ? json.results?.image           // single volume lookup
      : json.results?.[0]?.image;     // search result

    // Prefer medium (faster load) → fall back to original
    const cover = imageObj?.medium_url ?? imageObj?.original_url ?? null;
    cvCache[cacheKey] = cover;
    return cover;
  } catch (err) {
    console.error("[ComicVine] fetch error:", err);
    cvCache[cacheKey] = null;
    return null;
  }
};

/**
 * Batch-fetches Comic Vine covers for all comic entries in your data array.
 * Returns a map of { id → coverUrl } for entries that have a cvSearch field.
 * Call once on app mount and merge results into your display data.
 *
 * @param {Array} items - Your data array (filtered to comics)
 * @returns {Promise<Object>} map of item id → image URL
 */
export const fetchAllComicCovers = async (items) => {
  const comics = items.filter((d) => d.type === "comic" && d.cvSearch);
  const results = await Promise.allSettled(
    comics.map((d) => fetchComicCover(d.cvSearch, d.cvId))
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

// -------------------------------------------------------------
// 4. RAWG — Games  (add key here when ready)
// -------------------------------------------------------------
// const RAWG_KEY  = "YOUR_RAWG_KEY_HERE";
// const RAWG_BASE = "https://api.rawg.io/api";
//
// const rawgCache = {};
//
// export const fetchGameCover = async (title) => {
//   if (rawgCache[title]) return rawgCache[title];
//   try {
//     const res  = await fetch(
//       `${RAWG_BASE}/games?key=${RAWG_KEY}&search=${encodeURIComponent(title)}&page_size=1`
//     );
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
//   const games = items.filter((d) => d.type === "game");
//   const results = await Promise.allSettled(
//     games.map((d) => fetchGameCover(d.title))
//   );
//   const map = {};
//   games.forEach((d, i) => {
//     const val = results[i];
//     if (val.status === "fulfilled" && val.value) map[d.id] = val.value;
//   });
//   return map;
// };
