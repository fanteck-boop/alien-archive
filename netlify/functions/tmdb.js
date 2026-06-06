const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG  = "https://image.tmdb.org/t/p/w500";

exports.handler = async (event) => {
  const { title, year, detail } = event.queryStringParameters || {};
  const key = process.env.TMDB_KEY;

  if (!title) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing title" }) };
  }

  try {
    const yearParam = year ? `&primary_release_year=${year}` : "";
    const res  = await fetch(
      `${TMDB_BASE}/search/movie?api_key=${key}&query=${encodeURIComponent(title)}${yearParam}`
    );
    const json = await res.json();
    const movie = json.results?.[0] ?? null;

    if (!movie) return { statusCode: 200, body: JSON.stringify({ result: null }) };

    const result = {
      posterUrl: movie.poster_path ? `${TMDB_IMG}${movie.poster_path}` : null,
      overview:  movie.overview ?? null,
      vote_average: movie.vote_average ?? null,
      release_date: movie.release_date ?? null,
    };

    if (detail === "1") {
      const detailRes  = await fetch(`${TMDB_BASE}/movie/${movie.id}?api_key=${key}`);
      const detailJson = await detailRes.json();
      result.tagline  = detailJson.tagline ?? null;
      result.runtime  = detailJson.runtime ?? null;
      result.genres   = detailJson.genres?.map(g => g.name) ?? [];
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};