# Dublin Coffee Map — React

A React/Vite port of the single-page Leaflet demo (`canvas/map-gemini.html`). It recreates the sidebar, map markers, custom pins, popups, mobile overlay, and animated fly-to behavior.

## Quick Start

```bash
cd 03-coding-agents/dublin-coffee-map/react
npm install
npm run dev
```

Then open the local URL shown by Vite (typically http://localhost:5173).

## Notes

- Leaflet CSS, Google Fonts, and Font Awesome are loaded via CDN in `index.html`.
- The map uses CARTO Voyager tiles (same as the demo).
- To adjust shops or details, edit `src/App.jsx`.

## Notes (Human)

This React app was generated entirely by GitHub Copilot Agent mode in VSCode. It was asked this prompt:

> User: Can you help me make a Dublin coffee map react app based on the `map-gemini.html` single-page demo in the 03-coding-agents/dublin-coffee-map/react folder?

Some issues with this code:

- The agent generated a `package.json` with an older React version from June 2022 and a version of Vite from 2023 that has some moderate severity vulnerabilities
- Some minor code quality issues like unused imports in `main.jsx` and `App.jsx`
