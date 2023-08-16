import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";
import partytown from "@astrojs/partytown";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      filter: (page) => page !== `${SITE_URL}/blog/blank/`,
      serialize(item) {
        if (item.url === `${SITE_URL}/`) {
          item.priority = 1;
          return item
        }
        if (item.url === `${SITE_URL}/blog/`) {
          item.priority = 1;
          return item
        }
        item.priority = 0.8;
        return item
      },
      changefreq: 'hourly',
    }),
    image(),
    prefetch(),
    partytown(),
    robotsTxt(),
  ],
  markdown: {
    syntaxHighlight: "prism",
  },
});
