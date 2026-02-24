# uuid-generator-v1

A tiny Cloudflare Worker that returns a UUID as JSON, with permissive CORS enabled.

## Endpoint

- `GET /`

Returns:

```json
{ "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" }
```

CORS headers are enabled (`Access-Control-Allow-Origin: *`) and `OPTIONS` requests return `204` for preflight support.

## Authentication

This Worker requires an API key.

Send it in either:

- `X-API-Key: <token>`
- `Authorization: Bearer <token>`

Example:

```bash
curl -H "X-API-Key: $API_KEY" https://uuid.alohacraft.ai/
```

## Deploy (Cloudflare Workers)

This repo is configured for Wrangler with:

- `name = "uuid-generator-v1"`
- `main = "index.ts"`

### Prereqs

- Node.js
- A Cloudflare account
- Wrangler CLI

Install Wrangler:

```bash
npm i -g wrangler
```

### Login

```bash
wrangler login
```

### Deploy

```bash
wrangler deploy
```

### Set the API key secret

Set the secret named `API_KEY` (required for auth):

```bash
wrangler secret put API_KEY
```

## Local development

```bash
wrangler dev
```

Then hit the local URL Wrangler prints (usually `http://localhost:8787/`).

## Notes

- UUIDs are generated using the runtime `crypto.randomUUID()` API.
- This Worker is suitable as a reusable “UUID service” for clients/tools that need a simple HTTP UUID endpoint.
