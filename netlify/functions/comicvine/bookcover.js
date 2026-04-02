// netlify/functions/bookcover.js
//
// Fetches book cover from Open Library by searching for the title.
// Uses the search API which returns cover_i — the internal cover ID.
// Then returns the cover URL via covers.openlibrary.org/b/id/{cover_i}-M.jpg
//
// Usage: /.netlify/functions/bookcover?title=Alien+Sea+of+Sorrows

exports.handler = async (event) => {
  const { title } = event.queryStringParameters || {};

  if (!title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing title parameter" }),
    };
  }

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}&fields=title,cover_i&limit=5`;
    const res = await fetch(url, {
      headers: { "User-Agent": "AlienFranchiseArchive/1.0" },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Open Library request failed" }),
      };
    }

    const data = await res.json();

    // Find first result that has a cover
    const match = data.docs?.find((d) => d.cover_i);
    const cover = match
      ? `https://covers.openlibrary.org/b/id/${match.cover_i}-M.jpg`
      : null;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
      body: JSON.stringify({ cover }),
    };
  } catch (err) {
    console.error("[bookcover function] error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};