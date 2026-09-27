# BizBoost AI v3

This package adds real AI generation through a server-side API.

## Files
- `public/index.html` - PWA frontend
- `server.js` - secure backend
- `package.json` - Node dependencies
- `manifest.json`, `sw.js`, icons - PWA files

## Setup
1. Install Node.js 18+.
2. Run `npm install`.
3. Set the server environment variable `OPENAI_API_KEY` to your API key.
4. Optionally set `OPENAI_MODEL`.
5. Run `npm start`.
6. Open the address printed by the server.

IMPORTANT: Keep the API key on the server. Never paste it into `index.html`, JavaScript sent to the browser, GitHub, or a public repository.

For a real public app, add authentication, rate limits, logging, abuse protection, and server-side usage limits before allowing unrestricted public access.
