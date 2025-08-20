# Sonetica
Sonetica is an offline tool for poets built with TypeScript and Vite. It ships a basic editor, local dictionaries and a service worker for offline mode.

## Scripts

- `npm run fetch:fonts` – download local WOFF2 fonts.
- `npm run dev` – start development server.
- `npm run build` – build to `dist/`.
- `npm run preview` – preview the production build.
- `npm run lint` – TypeScript check.
- `npm test` – run unit tests.
- `npm run gen:icons` – generate PNG favicons from `public/icons/icon.svg` (run automatically before build).

## Fonts

Font binaries are not committed. After cloning run `npm run fetch:fonts` to download Noto Serif, PT Serif, IBM Plex Serif, Merriweather and STIX Two Text (weights 400/700 normal/italic). Files are placed in `public/assets/fonts` and ignored by git.

## Offline

The service worker (`public/sw.js`) caches core assets so the editor works without a network. During build the `sw-assets` Vite plugin collects files from the build output and injects them into the service worker. If new static files are added simply rebuild – the cache list is generated automatically.

The install step is resilient to missing files and skips 404 responses when populating the cache.

## i18n

Interface strings are stored as JSON dictionaries under `public/i18n`. The helper in `src/i18n` lazily fetches a language file and caches it in memory. Default language is English; call `loadLang('ru')` or `loadLang('uk')` to switch and use `t('key')` to access strings. The last chosen language is persisted in `localStorage`.

The settings dialog also lets you pick a light or dark theme and select a serif font family. Choices are saved locally.

## Dictionaries

A tiny demo lexicon is bundled. Additional word lists can be merged at runtime via `mergeLex` (see `src/analysis/dict.ts`). This allows loading larger dictionaries from external URLs without committing them.

## Assets

Binary files (icons, fonts) are not stored in git. Use local scripts to fetch them and ensure commits contain only text files.
