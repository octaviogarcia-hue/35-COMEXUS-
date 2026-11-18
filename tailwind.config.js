/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#002B49',
        legacy: '#003DA5',
        azure: '#0077C8',
        sky: '#00A9E0',
        ivory: '#F3EBDD',
        champagne: '#C9A66B',
      },
      fontFamily: {
        // Local licensed fonts (if uploaded to /public/fonts) take precedence.
        script: ['"Citadel Script"', '"Great Vibes"', 'cursive'],
        display: ['Charlon', 'Oranienbaum', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        legacy: '0.14em',
        eyebrow: '0.32em',
      },
    },
  },
  plugins: [],
};
