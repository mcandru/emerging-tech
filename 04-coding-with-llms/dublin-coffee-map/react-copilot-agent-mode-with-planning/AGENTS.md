# AGENTS.md

## Project overview

Dublin Coffee Map is a Vite + React app that uses React Leaflet for maps, Tailwind CSS v4 for styling, and shadcn/ui-style base components.

## Getting started

Install dependencies:

- `npm install`

Run the dev server:

- `npm run dev`

Build for production:

- `npm run build`

Preview the production build:

- `npm run preview`

## Libraries

- React + Vite
- React Leaflet + Leaflet for maps
- Tailwind CSS v4 (Vite plugin)
- lucide-react for icons
- shadcn/ui-style components in `src/components/ui`

## Tailwind v4 setup

Tailwind is configured using the Vite plugin (`@tailwindcss/vite`).

- Vite config: `vite.config.js`
- Tailwind import: `src/index.css` (`@import "tailwindcss";`)
- Theme tokens: `tailwind.config.js`

## Adding dependencies

Use npm for new dependencies to keep versions up to date:

- `npm install <package_name>`

If a dependency adds new types, install the corresponding `@types/*` package as needed.

## shadcn/ui usage

- Base UI components live in `src/components/ui`.
- Prefer reusing these components (e.g., `Button`, `Sheet`) instead of custom buttons or overlays.
- Utility `cn()` is in `src/lib/utils.js`.

To add a new shadcn component:

1. Add the component file under `src/components/ui/`.
2. Use Tailwind v4 syntax (e.g., `text-(--primary-color)` for CSS variables).
3. Keep colors aligned with `:root` CSS variables in `src/index.css` and `tailwind.config.js`.

## Data

Coffee shop data is stored locally in:

- `src/data/coffeeShops.json`

Update this file to add or edit shop entries.

## Map implementation notes

- Map is in `src/components/MapView.jsx`.
- Leaflet CSS is imported globally in `src/main.jsx`.
- Custom marker uses a lucide-react SVG rendered to static markup.

## Project structure

- `src/App.jsx`: app layout and state
- `src/components/`: UI sections
- `src/components/ui/`: shadcn-style base components
- `src/data/`: local JSON data
- `src/lib/`: shared utilities

## Styling guidelines

- Use Tailwind utility classes first.
- Avoid layout shifts on hover animations; prefer transforms on inner elements.
- Keep the color palette consistent with the prototype:
  - `--primary-color`: #4a3b32
  - `--secondary-color`: #d4a373
  - `--accent-color`: #bc6c25
  - `--bg-color`: #faf9f6
  - `--text-color`: #2c241e

## Troubleshooting

- If Tailwind classes don’t apply, confirm `@import "tailwindcss";` exists in `src/index.css`.
- If Leaflet markers don’t show, ensure `leaflet/dist/leaflet.css` is imported in `src/main.jsx`.
- If HMR warnings appear for UI components, ensure files export components only (avoid extra exports).
