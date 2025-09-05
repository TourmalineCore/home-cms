import z from "zod";

export const FooterNavigationSchema = z.array(
  z.object({
    name: z.string(),
    link: z.string(),
  })
);