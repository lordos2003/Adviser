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
- `src/components/sections/*` — секции: Header, Hero, Directions (+диалоги и лайтбокс), Approach, About, Contact (+форма и футер)
- `src/components/ui/*` — shadcn-примитивы (Button, Dialog, Sheet, Popover, Input, Label, Toaster)
- `src/components/magicui/*` — Marquee, MagicCard, BlurFade
- `public/media` — WebP-изображения в двух размерах (srcset)

`base: './'` — сборка работает и локально, и в подпапке GitHub Pages `/Adviser/`.
Форма не требует сервера: собирает письмо и открывает почтовый клиент (mailto).
