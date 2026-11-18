import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps every asset path relative, so the build works unchanged on
// GitHub Pages (https://user.github.io/repo/), Vercel, Netlify or any static host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { assetsDir: 'static' },
});
