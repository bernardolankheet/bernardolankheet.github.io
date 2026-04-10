const ALLOWED_ORIGIN = "https://bernardolankheet.github.io";
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "method_not_allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    // Only accept requests from the allowed origin
    const origin = request.headers.get("Origin");
    if (origin !== ALLOWED_ORIGIN) {
      return new Response(JSON.stringify({ success: false, error: "forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ success: false, error: "invalid_json" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    const token = body?.token;
    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ success: false, error: "missing_token" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    // Call Cloudflare Siteverify API — secret key comes from Worker env, never from client
    const formData = new FormData();
    formData.append("secret", env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", request.headers.get("CF-Connecting-IP") ?? "");

    const siteverifyResponse = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body: formData,
    });

    const outcome = await siteverifyResponse.json();

    return new Response(
      JSON.stringify({ success: outcome.success === true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  },
};
