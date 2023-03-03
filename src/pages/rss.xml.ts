import rss from "@astrojs/rss";
import { SITE_TITLE, OG_DEFAULT_DESCRIPTION, SITE_URL } from "../config";

export const get = () =>
  rss({
    title: SITE_TITLE,
    description: OG_DEFAULT_DESCRIPTION,
    site: SITE_URL,
    items: import.meta.glob("./articles/**/*.{md,mdx}"),
    customData: `<language>en-us</language>`,
  });
