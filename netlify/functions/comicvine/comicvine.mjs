// netlify/functions/comicvine.js
//
// Drop this file at: netlify/functions/comicvine.js
// Netlify will expose it at: /.netlify/functions/comicvine
//
// It proxies Comic Vine API requests server-side, which avoids
// the CORS block that prevents direct browser requests to Comic Vine.

const CV_KEY  = "11a97461452eee00cc36984e0956bc6565729625";
const CV_BASE = "https://comicvine.gamespot.com/api";

exports.handler = async (event) => {
  const { cvId } = event.queryStringParameters || {};

  if (!cvId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing cvId parameter" }),
    };
  }

  const url = `${CV_BASE}/volume/4050-${cvId}/?api_key=${CV_KEY}&format=json&field_list=id,name,image`;

  try {
    const response = await fetch(url, {
      headers: {
        // Comic Vine requires a User-Agent header
        "User-Agent": "AlienFranchiseArchive/1.0",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Comic Vine request failed" }),
      };
    }

    const data = await response.json();
    const image = data.results?.image;
    const cover = image?.medium_url ?? image?.original_url ?? null;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Allow your Netlify app to call this function
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ cover }),
    };
  } catch (err) {
    console.error("[comicvine function] error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};