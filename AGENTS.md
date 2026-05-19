# AGENTS.md

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run lint` — ESLint (zero warnings allowed)
- `npm run preview` — preview production build locally
- **No test framework is configured.** Do not try to run tests.

## Architecture
- Single-page app, no routing. Entry: `src/main.jsx` → `src/App.jsx` → `src/components/Dashboard.jsx`
- `Dashboard.jsx` is the sole state container. It owns all weather data, loading, and search history state, then passes callbacks down to children.
- Components: `Query` (search + geolocation), `WeatherCard` (daily forecast), `City` (header), `SearchHistory` (recent searches), `Skeleton` (placeholder).
- Hooks: `weather.js` (not actually used — Dashboard fetches inline), `unsplash.js`, `pixbay.js` (photo providers).
- Search history persisted in `localStorage` under key `searchHistory` (lowercased).

## Environment Variables
All must be prefixed with `VITE_` for Vite to expose them client-side:
- `VITE_OPENWEATHER_APIKEY` — **required** for weather data
- `VITE_UNSPLASH_ACCESSKEY` — optional, for background photos
- `VITE_PIXBAY_APIKEY` — optional alternative photo provider

Create a `.env` or `.env.local` file in the project root. Never commit secrets.

## Deployment
- Deployed to GitHub Pages on push to `main` (`.github/workflows/main.yml`).
- `vite.config.js` sets `base: '/weather-dashboard-react/'` — required for GitHub Pages path. Do not change this unless the repo name changes.
- CI injects `VITE_OPENWEATHER_APIKEY` and `VITE_UNSPLASH_ACCESSKEY` from repo secrets at build time.

## Gotchas
- The app calls the OpenWeatherMap `/data/2.5/forecast/daily` endpoint which is **deprecated** and unavailable on newer free-tier accounts. If weather data returns 401/404, this is likely the cause.
- ESLint uses flat config (`eslint.config.js`). Do not create `.eslintrc.*` files.
- Vite 8 uses Rolldown and Lightning CSS. `vite.config.js` has `css.lightningcss.errorRecovery: true` to handle DaisyUI's legacy IE CSS hacks — do not remove this.
- Geolocation requires HTTPS or `localhost`.
- No TypeScript. All files are `.jsx`/`.js`.
