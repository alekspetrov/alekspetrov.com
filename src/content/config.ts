import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    isDraft: z.boolean(),
    isFeatured: z.boolean(),
    layout: z.literal("../../layouts/ArticleLayout.astro"),
    titleBold: z.string().optional(),
    title: z.string(),
    tags: z.array(z.string()),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    openGraph: z.object({
      image: z.string(),
      description: z.string(),
    }),
    publishDate: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
};
