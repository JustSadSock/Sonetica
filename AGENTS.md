# Instructions for Agents

- Do not commit binary assets (fonts, images, archives) to the repository.
- Download fonts via `npm run fetch:fonts`; generated files stay ignored.
- Keep `public/icons` empty except for `.keep`; icons are generated or fetched at build time.
- If you need binary assets locally, ensure they are listed in `.gitignore` and not tracked.
