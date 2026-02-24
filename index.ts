const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
};

type Env = {
  API_KEY: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight — Adalo's Custom Action editor sends this
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const apiKeyHeader = request.headers.get("X-API-Key");
    const authHeader = request.headers.get("Authorization");

    const tokenFromAuthHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    const providedToken = apiKeyHeader ?? tokenFromAuthHeader;

    if (!env.API_KEY || !providedToken || providedToken !== env.API_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const uuid = crypto.randomUUID();

    return new Response(
      JSON.stringify({ uuid }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  },
};
