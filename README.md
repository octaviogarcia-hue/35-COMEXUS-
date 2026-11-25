# Celebrating a Legacy of Exchange — COMEXUS Gala Microsite

Official microsite for the COMEXUS gala · **December 2, 2026 · 7:00 PM – 10:00 PM** ·
Museo de Historia Natural y Cultura Ambiental, Bosque de Chapultepec, Mexico City.

React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide. Static build, works on GitHub Pages or Vercel with no server config.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Views & deep links

Routing is hash-based, so a static host always serves `index.html` and an external link can never 404.

| Link | Lands on |
| --- | --- |
| `https://<site>/#/alumni` | Alumni Showcase tab |
| `https://<site>/#/alumni/photographer-1` | Alumni page with Photographer 1’s profile open in a modal (also `-2` … `-6`) |
| `https://<site>/#/alumni/musician` | Musician profile |
| `https://<site>/?tab=alumni` · `?tab=alumni#photographer-2` · `#musician` | Also supported |
| `https://<site>/#/overview/program` | Event Program section (`story`, `future`, `support`, `milestones` too) |

## Editing content

The site is English only. Everything lives in **`src/data/galaData.ts`**: all copy (`CONTENT`), image paths (`ASSETS`), alumni external links (`ALUMNI_LINKS`) and the donation link (`DONATE_URL`). Replace the `[Photographer Name 1]`-style placeholders there.

## Images — `/public/assets/`

Missing files show elegant fallbacks; upload with these exact names and they appear automatically:

```
public/
├── fonts/                                   (optional, auto-detected)
│   ├── CitadelScript.woff2
│   └── Charlon.woff2
└── assets/
    ├── logos/
    │   ├── comexus-35-anniversary-white.png  Hero band + footer (on navy)
    │   ├── comexus-35-anniversary-color.png  35 Years card (on ivory)
    │   ├── fulbright-80th-anniversary-white.png   Hero band (on navy)
    │   ├── fulbright-80th-anniversary-blue.png    80 Years card (on ivory)
    │   ├── freedom-250-white.png             Hero band (on navy)
    │   └── freedom-250-color.png             250 Years card (on ivory)
    ├── story/
    │   ├── 1948-fulbright-mexico.jpg         (portrait, shown in a 3:4 frame)
    │   ├── 1980s-growth.jpg                  (pending: elegant fallback until uploaded)
    │   ├── 1990-comexus-established.png
    │   ├── 1991-first-board-meeting.png
    │   └── 1992-garcia-robles.jpg            (portrait, shown in a 3:4 frame)
    └── alumni/
        ├── photographer-1.jpg … photographer-6.jpg   (portrait, shown as a round medallion)
        ├── photographer-1-work.jpg … photographer-6-work.jpg   (featured work, any proportion, never cropped)
        └── musician.jpg                      (4:5 portrait, ≥ 1200 px wide)
```

Portrait timeline photos are flagged with `portrait: true` in `galaData.ts`; landscape ones use a 4:3 frame.

Logos: transparent PNG or SVG (if SVG, change the extension in `galaData.ts`).

## Deploy

- **GitHub Pages:** Settings → Pages → Source: *GitHub Actions*. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- **Vercel:** import the repo; framework *Vite*, build `npm run build`, output `dist`.

- **Own server (Apache, Nginx, IIS…):** run `npm run build` and copy the *contents* of `dist/` (`index.html`, `static/`, `assets/`, `favicon.svg`) to the site root or to any sub-folder, e.g. `comexus.org.mx/gala/`. No rewrite rules are needed: navigation is hash-based (`#/alumni/...`), so the server only ever serves `index.html`. Link to the folder with a trailing slash (`/gala/`); most servers add it automatically.

`vite.config.ts` uses `base: './'`, so the same build works at a domain root or a `/repo-name/` sub-path.
