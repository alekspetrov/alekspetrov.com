import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { OG_DEFAULT_DESCRIPTION, SITE_TITLE, SITE_URL } from "../config";

export async function get(context) {
  return rss({
    title: SITE_TITLE,
    description: OG_DEFAULT_DESCRIPTION,
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob("./blog/*.{md,mdx}"),
    ),
    customData: `<language>en-us</language>`,
  });
}
