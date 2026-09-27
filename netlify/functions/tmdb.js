const { corsHeaders } = require("./_cors");

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG  = "https://image.tmdb.org/t/p/w500";

exports.handler = async (event) => {
  const { title, year, detail } = event.queryStringParameters || {};
  const key = process.env.TMDB_KEY;

  if (!title) {
    return { statusCode: 400, headers: corsHeaders(event), body: JSON.stringify({ error: "Missing title" }) };
  }

  try {
    const yearParam = year ? `&primary_release_year=${year}` : "";

    // Try movie search first
    let res = await fetch(
      `${TMDB_BASE}/search/movie?api_key=${key}&query=${encodeURIComponent(title)}${yearParam}`
    );
    let json = await res.json();
    let item = json.results?.[0] ?? null;
    let isTV = false;

    // Fall back to TV search if no movie found
    if (!item) {
      const tvRes = await fetch(
        `${TMDB_BASE}/search/tv?api_key=${key}&query=${encodeURIComponent(title)}`
      );
      const tvJson = await tvRes.json();
      item = tvJson.results?.[0] ?? null;
      isTV = true;
    }

    if (!item) return { statusCode: 200, body: JSON.stringify({ result: null }) };

    const result = {
      posterUrl: item.poster_path ? `${TMDB_IMG}${item.poster_path}` : null,
      overview:  item.overview ?? null,
      vote_average: item.vote_average ?? null,
      release_date: item.release_date ?? item.first_air_date ?? null,
    };

    if (detail === "1") {
      const endpoint = isTV ? "tv" : "movie";
      const detailRes  = await fetch(`${TMDB_BASE}/${endpoint}/${item.id}?api_key=${key}`);
      const detailJson = await detailRes.json();
      result.tagline  = detailJson.tagline ?? null;
      result.runtime  = isTV
        ? (detailJson.episode_run_time?.[0] ? `${detailJson.episode_run_time[0]} min/ep` : null)
        : (detailJson.runtime ? `${detailJson.runtime} min` : null);
      result.genres   = detailJson.genres?.map(g => g.name) ?? [];
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(event) },
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    console.error("[tmdb function] error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};