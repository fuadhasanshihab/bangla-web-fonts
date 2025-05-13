import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
if ((process.env.astro || "") !== "5") process.exit(1);
export default defineConfig({
  site: 'https://banglawebfonts.pages.dev',
  integrations: [sitemap(),tailwind(),preact()],
});
