# Celebrating a Legacy of Exchange — COMEXUS Gala Microsite

Official microsite for the COMEXUS gala · **December 2, 2026 · 7:00 PM – 10:00 PM** ·
Museo de Historia Natural y Cultura Ambiental, Bosque de Chapultepec, Mexico City.

React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide. Static build, works on GitHub Pages or Vercel with no server config.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Views & QR deep links

Routing is hash-based, so a static host always serves `index.html` and a QR code can never 404.

| QR / link | Lands on |
| --- | --- |
| `https://<site>/#/alumni` | Alumni Showcase tab |
| `https://<site>/#/alumni/photographer-1` | Photographer 1 profile (also `-2`, `-3`) |
| `https://<site>/#/alumni/musician` | Musician profile |
| `https://<site>/?tab=alumni` · `?tab=alumni#photographer-2` · `#musician` | Also supported |
| `https://<site>/#/overview/program` | Event Program section (`story`, `milestones` too) |
| append `?lang=es` (e.g. `/?lang=es#/alumni`) | Opens in Spanish (default is English) |

Each alumni card has a **copy-link** button that copies its canonical deep link — handy for generating the QR codes.

## Editing content

Everything lives in **`src/data/galaData.ts`**: all English/Spanish copy, image paths (`ASSETS`) and alumni external links (`ALUMNI_LINKS`). Replace the `[Photographer Name 1]`-style placeholders there.

## Images — `/public/assets/`

Missing files show elegant fallbacks; upload with these exact names and they appear automatically:

```
public/
├── fonts/                                   (optional, auto-detected)
│   ├── CitadelScript.woff2
│   └── Charlon.woff2
└── assets/
    ├── logos/
    │   ├── comexus-35-anniversary.png        Hero band + 35 Years card
    │   ├── fulbright-comexus.png             Footer
    │   ├── fulbright-80th-anniversary-white.png   Hero band / footer (on navy)
    │   ├── fulbright-80th-anniversary-blue.png    80 Years card (on ivory)
    │   └── freedom-250-color.png             Hero band, 250 Years card, footer
    ├── story/
    │   ├── 1948-fulbright-mexico.jpg
    │   ├── 1980s-growth.jpg
    │   ├── 1990-comexus-established.jpg
    │   ├── 1991-first-board-meeting.jpg
    │   └── 1992-garcia-robles.jpg            (4:3 recommended)
    └── alumni/
        ├── photographer-1.jpg
        ├── photographer-2.jpg
        ├── photographer-3.jpg                (4:5 portrait, ≥ 900 px wide)
        └── musician.jpg                      (4:5 portrait, ≥ 1200 px wide)
```

Logos: transparent PNG or SVG (if SVG, change the extension in `galaData.ts`).

## Deploy

- **GitHub Pages:** Settings → Pages → Source: *GitHub Actions*. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- **Vercel:** import the repo; framework *Vite*, build `npm run build`, output `dist`.

`vite.config.ts` uses `base: './'`, so the same build works at a domain root or a `/repo-name/` sub-path.
