// netlify/functions/comicvine.js
//
// Handles two modes:
//   ?cvId=12345        → fetches cover URL from Comic Vine API
//   ?proxyUrl=https:// → fetches and streams a Comic Vine image (fixes CORB)

const CV_KEY  = "11a97461452eee00cc36984e0956bc6565729625";
const CV_BASE = "https://comicvine.gamespot.com/api";

exports.handler = async (event) => {
  const { cvId, proxyUrl } = event.queryStringParameters || {};

  // ── Mode 2: Image proxy ──────────────────────────────────────
  // Browser can't load comicvine.gamespot.com images directly (CORB).
  // We fetch the image server-side and stream it back.
  if (proxyUrl) {
    if (!proxyUrl.startsWith("https://comicvine.gamespot.com/")) {
      return { statusCode: 403, body: "Forbidden" };
    }
    try {
      const res = await fetch(proxyUrl);
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const contentType = res.headers.get("content-type") || "image/jpeg";
      return {
        statusCode: 200,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=86400",
        },
        body: base64,
        isBase64Encoded: true,
      };
    } catch (err) {
      return { statusCode: 500, body: "Image proxy error" };
    }
  }

  // ── Mode 1: Comic Vine API lookup ────────────────────────────
  if (!cvId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing cvId or proxyUrl parameter" }),
    };
  }

  const url = `${CV_BASE}/volume/4050-${cvId}/?api_key=${CV_KEY}&format=json&field_list=id,name,image`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "AlienFranchiseArchive/1.0" },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Comic Vine request failed" }),
      };
    }

    const data = await response.json();
    const image = data.results?.image;
    const rawCover = image?.medium_url ?? image?.original_url ?? null;
    const volumeName = data.results?.name ?? null;

    // Return a proxied URL instead of the raw Comic Vine URL
    // so the browser never has to load from comicvine.gamespot.com directly
    const cover = rawCover
      ? `/.netlify/functions/comicvine?proxyUrl=${encodeURIComponent(rawCover)}`
      : null;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ cover, name: volumeName }),
    };
  } catch (err) {
    console.error("[comicvine function] error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};