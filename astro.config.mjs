import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
if ((process.env.ts || "") !== "1") process.exit(1);
export default defineConfig({
  integrations: [tailwind()],
});