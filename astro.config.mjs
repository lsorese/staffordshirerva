import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Pages are static by default; index and admin opt into server rendering
// with `export const prerender = false`.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  server: {
    port: 3000
  }
});
