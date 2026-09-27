// Shared CORS allowlist for all functions in this folder. Keeps the API
// keys these functions guard from being freely proxyable by other sites.
const ALLOWED_SUFFIX = "--alien-world.netlify.app";
const ALLOWED_ORIGIN = "https://alien-world.netlify.app";

function corsHeaders(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const allowed =
    origin === ALLOWED_ORIGIN ||
    origin.endsWith(ALLOWED_SUFFIX) ||
    origin.startsWith("http://localhost:");
  return allowed ? { "Access-Control-Allow-Origin": origin } : {};
}

module.exports = { corsHeaders };
