/**
 * Optional licensed fonts.
 * If `CitadelScript.woff2` and/or `Charlon.woff2` are uploaded to /public/fonts/,
 * they are registered at runtime and take priority over Great Vibes / Oranienbaum
 * (see the font stacks in tailwind.config.js). If the files are absent, nothing
 * happens and the Google Fonts are used. The equivalent static @font-face rules
 * are kept, commented out, in src/index.css.
 */
const LOCAL_FONTS = [
  { family: 'Citadel Script', file: 'CitadelScript.woff2' },
  { family: 'Charlon', file: 'Charlon.woff2' },
];

export function loadLocalFonts() {
  if (typeof window === 'undefined' || !('FontFace' in window)) return;
  for (const { family, file } of LOCAL_FONTS) {
    const url = `${import.meta.env.BASE_URL}fonts/${file}`;
    // HEAD first so a missing file never produces a font-decoding error.
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        if (!res.ok || type.includes('text/html')) return;
        const face = new FontFace(family, `url(${url}) format('woff2')`, { display: 'swap' });
        return face.load().then((loaded) => document.fonts.add(loaded));
      })
      .catch(() => {
        /* not uploaded — keep Google Fonts */
      });
  }
}
