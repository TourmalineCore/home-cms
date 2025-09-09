import z from "zod";

const HeroSchema = z.object({
  __component: z.literal(`shared.hero`),
  id: z.number(),
  title: z.string(),
  description: z.string(),
  gallery: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
    }))
});

export const HomepageSchema = z.object({
  id: z.number(),
  blocks: z.array(
    HeroSchema
  )
});

