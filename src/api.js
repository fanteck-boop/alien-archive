// =============================================================
// api.js — All external API calls go through Netlify serverless
//           functions so API keys are NEVER exposed in the browser.
// =============================================================

// ─────────────────────────────────────────────────────────────
// 1. TMDB — Movies (poster images, fetched at startup)
// ─────────────────────────────────────────────────────────────
const tmdbCache = {};

export const fetchMovie = async (title, year) => {
  const key = `${title}-${year}`;
  if (tmdbCache[key]) return tmdbCache[key];
  try {
    const res = await fetch(
      `/.netlify/functions/tmdb?title=${encodeURIComponent(title)}&year=${year ?? ''}`
    );
    const json = await res.json();
    const result = json.result ?? null;
    tmdbCache[key] = result;
    return result;
  } catch (err) {
    console.error('[TMDB] fetch error:', err);
    return null;
  }
};

export const fetchAllMoviePosters = async (items) => {
  const movies = items.filter((d) => d.type === 'movie' && !d.imageUrl);
  const results = await Promise.allSettled(movies.map((d) => fetchMovie(d.title, d.year)));
  const map = {};
  movies.forEach((d, i) => {
    const val = results[i];
    if (val.status === 'fulfilled' && val.value?.posterUrl) {
      map[d.id] = val.value.posterUrl;
    }
  });
  return map;
};

// ─────────────────────────────────────────────────────────────
// 2. Open Library — Books (covers, fetched at startup)
// ─────────────────────────────────────────────────────────────
const bookCoverCache = {};

export const fetchBookCover = async (title) => {
  if (bookCoverCache[title] !== undefined) return bookCoverCache[title];
  try {
    const res = await fetch(
      `/.netlify/functions/bookcover?title=${encodeURIComponent(title)}`
    );
    const json = await res.json();
    bookCoverCache[title] = json.cover ?? null;
    return bookCoverCache[title];
  } catch (err) {
    console.error('[BookCover] fetch error:', err);
    bookCoverCache[title] = null;
    return null;
  }
};

export const fetchAllBookCovers = async (items) => {
  const books = items.filter((d) => d.type === 'book' && !d.imageUrl);
  const results = await Promise.allSettled(books.map((d) => fetchBookCover(d.title)));
  const map = {};
  books.forEach((d, i) => {
    const val = results[i];
    if (val.status === 'fulfilled' && val.value) map[d.id] = val.value;
  });
  return map;
};

// ─────────────────────────────────────────────────────────────
// 3. Comic Vine — Comics (covers, fetched at startup)
// ─────────────────────────────────────────────────────────────
const cvCoverCache = {};

export const fetchComicCover = async (cvId) => {
  if (cvCoverCache[cvId] !== undefined) return cvCoverCache[cvId];
  try {
    const res = await fetch(`/.netlify/functions/comicvine?cvId=${cvId}`);
    const json = await res.json();
    cvCoverCache[cvId] = json.cover ?? null;
    return cvCoverCache[cvId];
  } catch (err) {
    console.error('[ComicVine] fetch error:', err);
    cvCoverCache[cvId] = null;
    return null;
  }
};

export const fetchAllComicCovers = async (items) => {
  const comics = items.filter((d) => d.type === 'comic' && d.cvId);
  const results = await Promise.allSettled(comics.map((d) => fetchComicCover(d.cvId)));
  const map = {};
  comics.forEach((d, i) => {
    const val = results[i];
    if (val.status === 'fulfilled' && val.value) map[d.id] = val.value;
  });
  return map;
};

// ─────────────────────────────────────────────────────────────
// 4. Modal detail fetchers — called on-demand when a card is opened
//    Each normalises the response to:
//    { overview, tagline?, apiRating?, apiRatingLabel?, genres?, runtime?, platforms?, subjects? }
// ─────────────────────────────────────────────────────────────

const detailCache = {};

/** Movie — TMDB */
export const fetchMovieDetail = async (title, year) => {
  const key = `movie-${title}-${year}`;
  if (detailCache[key]) return detailCache[key];
  try {
    const res = await fetch(
      `/.netlify/functions/tmdb?title=${encodeURIComponent(title)}&year=${year ?? ''}&detail=1`
    );
    const json = await res.json();
    const r = json.result ?? {};
    const normalised = {
      overview:       r.overview ?? null,
      tagline:        r.tagline ?? null,
      apiRating:      r.vote_average ? Math.round(r.vote_average * 10) / 10 : null,
      apiRatingLabel: 'TMDB Score',
      runtime:        r.runtime ? `${r.runtime} min` : null,
      genres:         r.genres?.join(', ') ?? null,
    };
    detailCache[key] = normalised;
    return normalised;
  } catch (err) {
    console.error('[TMDB detail] error:', err);
    return null;
  }
};

/** Game — RAWG */
export const fetchGameDetail = async (title) => {
  const key = `game-${title}`;
  if (detailCache[key]) return detailCache[key];
  try {
    const res = await fetch(
      `/.netlify/functions/rawg?title=${encodeURIComponent(title)}`
    );
    const json = await res.json();
    const r = json.result ?? {};
    const normalised = {
      overview:       r.description ?? null,
      apiRating:      r.rating ? Math.round(r.rating * 10) / 10 : null,
      apiRatingLabel: r.metacritic ? `Metacritic ${r.metacritic}` : 'RAWG Score',
      genres:         r.genres?.join(', ') ?? null,
      platforms:      r.platforms?.join(', ') ?? null,
    };
    detailCache[key] = normalised;
    return normalised;
  } catch (err) {
    console.error('[RAWG detail] error:', err);
    return null;
  }
};

/** Book — Open Library */
export const fetchBookDetail = async (title) => {
  const key = `book-${title}`;
  if (detailCache[key]) return detailCache[key];
  try {
    const res = await fetch(
      `/.netlify/functions/bookcover?title=${encodeURIComponent(title)}&detail=1`
    );
    const json = await res.json();
    const normalised = {
      overview:  json.overview ?? json.description ?? null,
      subjects:  json.subjects ?? null,
      apiRating: null,
    };
    detailCache[key] = normalised;
    return normalised;
  } catch (err) {
    console.error('[BookDetail] error:', err);
    return null;
  }
};

/** Comic — Comic Vine */
export const fetchComicDetail = async (cvId, title) => {
  const key = `comic-${cvId ?? title}`;
  if (detailCache[key]) return detailCache[key];
  try {
    const params = cvId
      ? `cvId=${cvId}`
      : `title=${encodeURIComponent(title)}`;
    const res = await fetch(`/.netlify/functions/comicvine?${params}&detail=1`);
    const json = await res.json();
    const normalised = {
      overview:   json.overview ?? json.description ?? null,
      apiRating:  null,
      issueCount: json.issueCount ?? null,
      publisher:  json.publisher ?? null,
    };
    detailCache[key] = normalised;
    return normalised;
  } catch (err) {
    console.error('[ComicVine detail] error:', err);
    return null;
  }
};


// ─────────────────────────────────────────────────────────────
// 5. Batch live ratings — fetches scores for all items in background
//    Returns { [itemId]: number }
// ─────────────────────────────────────────────────────────────
export const fetchAllLiveRatings = async (items, onProgress) => {
  const ratingMap = {};

  // Process in small batches to avoid hammering APIs
  const BATCH = 6;
  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    await Promise.allSettled(
      batch.map(async (item) => {
        try {
          let rating = null;
          if (item.type === 'movie') {
            const res = await fetch(`/.netlify/functions/tmdb?title=${encodeURIComponent(item.title)}&year=${item.year ?? ''}`);
            const json = await res.json();
            const v = json.result?.vote_average;
            rating = v ? Math.round(v * 10) / 10 : null;
          } else if (item.type === 'game') {
            const res = await fetch(`/.netlify/functions/rawg?title=${encodeURIComponent(item.rawgSearch ?? item.title)}`);
            const json = await res.json();
            const v = json.result?.rating;
            rating = v ? Math.round(v * 10) / 10 : null;
          }
          // books and comics don't have a universal score API so skip
          if (rating !== null) ratingMap[item.id] = rating;
          if (onProgress) onProgress({ ...ratingMap });
        } catch (_) {}
      })
    );
  }
  return ratingMap;
};