
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { SITE_URL } from "./src/config";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";

const __unconfig_default =  defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      filter: (page) => page !== "https://alekspetrov.com/work-experience/",
    }),
    image(),
    prefetch(),
  ],
  markdown: {
    syntaxHighlight: "prism",
  },
});

if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;