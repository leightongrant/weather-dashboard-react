# Weather Dashboard (React + Vite)

A small, responsive weather dashboard built with React, Vite, and Tailwind CSS.
It fetches weather data from OpenWeatherMap and uses Unsplash / Pixabay to show background imagery for each forecast day. The app supports searching by city name and getting the user's current location via the Geolocation API. Recent searches are saved to `localStorage`.

## Features

-   Search for a city to view a multi-day forecast.
-   Use your device location to auto-populate the city search.
-   Photo-backed weather cards pulled from Unsplash/Pixabay based on weather conditions.
-   Search history stored in `localStorage` (click to re-fetch, or remove).
-   Built with Vite for fast dev builds and Tailwind CSS for styling.

## Tech stack

-   React 18
-   Vite
-   Tailwind CSS
-   DaisyUI (via `react-daisyui`) for some UI elements
-   Unsplash / Pixabay (background photos)
-   OpenWeatherMap (forecast data)
-   Utilities: `lodash-es`, `clsx`, `react-icons`, loader spinners

## Quick start

Prerequisites

-   Node.js (18+) or Bun (the repo contains a `bun.lockb` if you prefer Bun)
-   An OpenWeatherMap API key (required)
-   An Unsplash access key (recommended — falls back to Pixabay if you choose)
-   (Optional) Pixabay API key if you want to use Pixabay directly

Install dependencies

Using npm:

```bash
npm install
```

Using bun:

```bash
bun install
```

Run the dev server

```bash
npm run dev
# or
bun run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Linting

```bash
npm run lint
```

## Environment variables

The app expects environment variables prefixed with `VITE_` so Vite exposes them to the client. Create a `.env` file in the project root (do not commit secrets) with the following values:

```env
VITE_OPENWEATHER_APIKEY=your_openweather_api_key
VITE_UNSPLASH_ACCESSKEY=your_unsplash_access_key
VITE_PIXBAY_APIKEY=your_pixabay_api_key
```

-   `VITE_OPENWEATHER_APIKEY` — required. The app calls OpenWeatherMap endpoints for geocoding and forecast data.
-   `VITE_UNSPLASH_ACCESSKEY` — optional but used to fetch attractive background photos for forecast cards.
-   `VITE_PIXBAY_APIKEY` — optional alternative photo provider used by a hook in the project.

Notes on APIs

-   The code uses the OpenWeatherMap geocoding (`/geo/1.0/reverse`) and the daily forecast endpoint (`/data/2.5/forecast/daily`) with `units=metric`.
-   Make sure your OpenWeather account has the appropriate access and quota for these endpoints.

## How it works / UX

-   The main component is `src/components/Dashboard.jsx`. It manages state for loading, search history, and fetched weather data.
-   `src/components/Query.jsx` renders the search input and the geolocation button. It uses the browser `navigator.geolocation` API to retrieve coordinates and then reverse-geocodes with OpenWeather.
-   `src/components/WeatherCard.jsx` displays a single day's forecast and asks `src/hooks/unsplash.js` (or `pixbay.js`) for a related background photo.
-   Recent searches are saved in `localStorage` under the key `searchHistory` and displayed by `src/components/SearchHistory.jsx`.

## Project structure (key files)

-   `index.html` — Vite entry HTML
-   `src/main.jsx` — React entry
-   `src/App.jsx` — root App (renders `Dashboard`)
-   `src/components/Dashboard.jsx` — app container and data fetch orchestration
-   `src/components/Query.jsx` — search input, location button
-   `src/components/WeatherCard.jsx` — daily forecast card
-   `src/components/City.jsx` — header showing current city and condition
-   `src/components/SearchHistory.jsx` — recent searches UI
-   `src/components/Skeleton.jsx` — small placeholder skeleton UI
-   `src/hooks/unsplash.js` — helper that calls Unsplash API
-   `src/hooks/pixbay.js` — helper that calls Pixabay API
-   `src/hooks/weather.js` — small helper wrapper for fetching/parsing OpenWeather responses
-   `tailwind.config.js`, `postcss.config.js` — Tailwind setup
-   `vite.config.js` — Vite config

## Usage notes & tips

-   The app expects lower-case history entries; the Dashboard component ensures history items are stored in lower case and prevents duplicates.
-   If you see a blank screen or `undefined` data, confirm your `VITE_OPENWEATHER_APIKEY` is set and valid.
-   Geolocation requires HTTPS (or `localhost`) and will prompt the user for permission.
-   If background images fail to load, the weather cards will still display textual data and icons from OpenWeather.

## Troubleshooting

-   CORS / blocked requests: If a third-party API rejects requests from the browser, test the request in a server-side proxy or ensure your API plan allows browser usage.
-   Missing env variables: The app will not fetch weather data without `VITE_OPENWEATHER_APIKEY`.
-   API rate limits: Watch quota for Unsplash/Pixabay/OpenWeather; consider caching or server-side proxy for heavy usage.

## Contributing

Feel free to open issues or PRs. Small suggestions:

-   Improve accessibility and ARIA attributes for interactive controls.
-   Add unit or integration tests for the fetch logic in `Dashboard.jsx`.
-   Add error boundary components to better surface fetch errors.

## License

This repository doesn't include a license file — add one if you plan to open-source it publicly.

---

If you'd like, I can also:

-   Add a minimal `.env.example` file with the VITE\_ variables populated with placeholders.
-   Create a short CONTRIBUTING.md or update the repo `package.json` to include a `start` script.

Status: README generated from source files present in the repository on Sep 17, 2025.
