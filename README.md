# Sonetica
Sonetica — офлайн-приложение для поэтов. Проект содержит минимальный каркас на TypeScript и Vite: подключение шрифтов, базовый редактор и service worker для офлайн-режима.

## Скрипты

- `npm run fetch:fonts` — загрузить локальные WOFF2 шрифты.
- `npm run dev` — режим разработки.
- `npm run build` — сборка в папку `dist/`.
- `npm run preview` — предпросмотр собранной версии.
- `npm run lint` — проверка TypeScript.

## Шрифты

Локальные файлы шрифтов не хранятся в git. После клонирования выполните `npm run fetch:fonts`, чтобы скачать Noto Serif, PT Serif, IBM Plex Serif, Merriweather и STIX Two Text (весы 400/700, normal/italic). Лицензии находятся в `assets/fonts/LICENSES/`.

## Офлайн

Service worker (`public/sw.js`) кэширует основные ассеты, так что редактор доступен без сети.

## Assets

Бинарные файлы (иконки, шрифты) не хранятся в репозитории. Используйте локальные скрипты для их получения и убедитесь, что в коммитах нет бинарников.
