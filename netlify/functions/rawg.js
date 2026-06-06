const RAWG_BASE = "https://api.rawg.io/api";

exports.handler = async (event) => {
  const { title } = event.queryStringParameters || {};
  const key = process.env.RAWG_KEY;

  if (!title) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing title" }) };
  }

  try {
    const res  = await fetch(`${RAWG_BASE}/games?key=${key}&search=${encodeURIComponent(title)}&page_size=1`);
    const json = await res.json();
    const game = json.results?.[0] ?? null;

    if (!game) return { statusCode: 200, body: JSON.stringify({ result: null }) };

    const detailRes  = await fetch(`${RAWG_BASE}/games/${game.id}?key=${key}`);
    const detail     = await detailRes.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        result: {
          description: detail.description_raw ?? null,
          rating:      detail.rating ?? null,
          metacritic:  detail.metacritic ?? null,
          genres:      detail.genres?.map(g => g.name) ?? [],
          platforms:   detail.platforms?.map(p => p.platform.name) ?? [],
        }
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};