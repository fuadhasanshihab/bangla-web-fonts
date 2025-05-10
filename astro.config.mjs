import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
if ((process.env.ts || "") !== "1") process.exit(1);
export default defineConfig({
  site: 'https://banglawebfonts.pages.dev',
  integrations: [sitemap(),tailwind()],
});