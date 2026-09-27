const { corsHeaders } = require("./_cors");

const CV_KEY  = process.env.CV_KEY;
const CV_BASE = "https://comicvine.gamespot.com/api";

exports.handler = async (event) => {
  const { cvId, proxyUrl, detail } = event.queryStringParameters || {};

  // ── Mode: Image proxy ────────────────────────────────────────
  if (proxyUrl) {
    if (!proxyUrl.startsWith("https://comicvine.gamespot.com/")) {
      return { statusCode: 403, headers: corsHeaders(event), body: "Forbidden" };
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
          ...corsHeaders(event),
          "Cache-Control": "public, max-age=86400",
        },
        body: base64,
        isBase64Encoded: true,
      };
    } catch (err) {
      console.error("[comicvine function] image proxy error:", err);
      return { statusCode: 500, headers: corsHeaders(event), body: "Image proxy error" };
    }
  }

  // ── Mode: Comic Vine API lookup ───────────────────────────────
  if (!cvId) {
    return {
      statusCode: 400,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: "Missing cvId or proxyUrl parameter" }),
    };
  }
  if (!/^\d+$/.test(cvId)) {
    return {
      statusCode: 400,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: "cvId must be numeric" }),
    };
  }

  const fieldList = detail === "1"
    ? "id,name,image,deck,description,publisher,count_of_issues"
    : "id,name,image";

  const url = `${CV_BASE}/volume/4050-${cvId}/?api_key=${CV_KEY}&format=json&field_list=${fieldList}`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "AlienFranchiseArchive/1.0" },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders(event),
        body: JSON.stringify({ error: "Comic Vine request failed" }),
      };
    }

    const data = await response.json();
    const results = data.results ?? {};
    const image = results.image;
    const rawCover = image?.medium_url ?? image?.original_url ?? null;

    const cover = rawCover
      ? `/.netlify/functions/comicvine?proxyUrl=${encodeURIComponent(rawCover)}`
      : null;

    // Strip HTML tags from description
    const stripHtml = (str) => str ? str.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 900) : null;

    const body = { cover };

    if (detail === "1") {
      body.overview   = stripHtml(results.deck) || stripHtml(results.description) || null;
      body.publisher  = results.publisher?.name ?? null;
      body.issueCount = results.count_of_issues ?? null;
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(event),
      },
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.error("[comicvine function] error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};