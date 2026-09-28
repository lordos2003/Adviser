# ADVISER — новая версия сайта

React + Vite + TypeScript, Tailwind CSS v4, shadcn/ui (Radix), компоненты Magic UI, Motion.

## Команды

```bash
npm install
npm run dev      # локальная разработка — http://localhost:5173
npm run lint     # oxlint
npm run build    # production-сборка в dist/
npm run preview  # просмотр сборки — http://localhost:4173
```

## Структура

- `src/content.ts` — все тексты, контакты, пути к изображениям
- `src/components/signal-canvas.tsx` — фирменный интерактивный эффект «Сигнал»
- `src/components/sections/*` — секции: Header, Hero, Directions (+диалоги и лайтбокс), About, Contact (+форма и футер)
- `src/components/ui/*` — shadcn-примитивы (Button, Dialog, Sheet, Popover, Input, Label, Toaster)
- `src/components/magicui/*` — MagicCard, BlurFade
- `src/assets/media` — WebP-изображения в двух размерах (srcset)
- `vite.single.config.ts` — сборка в один автономный HTML-файл (`npx vite build -c vite.single.config.ts`), удобно для превью без сервера

`base: './'` — сборка работает и локально, и на GitHub Pages как из корня (`/Adviser/`), так и из подпапки.
Форма не требует сервера: собирает письмо и открывает почтовый клиент (mailto).

## Деплой

Эта ветка (`v2-source`) — исходники. Публикуемая сборка живёт в ветке `main`:

1. `npm run build` → `dist/`.
2. Содержимое `dist/` скопировать в **корень** репозитория ветки `main` (это и есть https://lordos2003.github.io/Adviser/).
3. Проверить, что в собранном `dist/index.html` `robots`, `canonical` и `og:*` указывают на корень (`https://lordos2003.github.io/Adviser/`), а не на подпапку.
4. Закоммитить и запушить `main`.

Старая версия сайта (чистый HTML/CSS/JS) сохранена в `main` в папке `/v1/` как архив, закрыта от индексации.
