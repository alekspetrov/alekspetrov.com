import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  site: "https://alekspetrov.com",
  integrations: [mdx(), sitemap(), tailwind(), image(), prefetch()],
});
