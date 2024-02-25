import { z, defineCollection } from "astro:content";

const tealogCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
    rating: z.number().int().min(1).max(10),
  }),
});

export const collections = {
  tealog: tealogCollection,
};
