import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), tailwind(), sitemap({
    filter: page => page !== "https://alekspetrov.com/work-experience/"
  }), image(), prefetch(), partytown()],
  markdown: {
    syntaxHighlight: "prism"
  }
});