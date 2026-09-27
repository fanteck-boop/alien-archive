const { corsHeaders } = require("./_cors");

exports.handler = async (event) => {
  const { title, detail } = event.queryStringParameters || {};

  if (!title) {
    return { statusCode: 400, headers: corsHeaders(event), body: JSON.stringify({ error: "Missing title" }) };
  }

  try {
    const res  = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}&fields=key,title,cover_i,subject&limit=5`);
    const json = await res.json();
    const book = json.docs?.find((d) => d.cover_i) ?? json.docs?.[0] ?? null;

    if (!book) return { statusCode: 200, headers: corsHeaders(event), body: JSON.stringify({ cover: null }) };

    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null;

    if (!detail) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(event) },
        body: JSON.stringify({ cover }),
      };
    }

    // Detail mode
    let overview = null;
    if (book.key) {
      try {
        const workRes  = await fetch(`https://openlibrary.org${book.key}.json`);
        const workJson = await workRes.json();
        const desc = workJson.description;
        if (typeof desc === "string") overview = desc.slice(0, 900);
        else if (desc?.value) overview = desc.value.slice(0, 900);
      } catch (_) {}
    }

    const subjects = (book.subject || []).slice(0, 6).join(", ") || null;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(event) },
      body: JSON.stringify({ cover, overview, subjects }),
    };
  } catch (err) {
    console.error("[bookcover function] error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(event),
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};