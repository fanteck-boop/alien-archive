const API_KEY = "ae53612a21670bc3c8004895f3a00cf9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const cache = {};

export const fetchMovie = async (title, year) => {
  const cacheKey = `${title}-${year}`;
  if (cache[cacheKey]) return cache[cacheKey];
  try {
    const yearParam = year ? `&primary_release_year=${year}` : '';
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}${yearParam}`
    );
    const data = await res.json();
    const result = data.results?.[0] || null;
    if (result) {
      result.posterUrl = result.poster_path
        ? `${IMG_BASE}${result.poster_path}`
        : null;
    }
    cache[cacheKey] = result;
    return result;
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return null;
  }
};