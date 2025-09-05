import z from "zod";

const NavItemSchema = z.object({
  name: z.string(),
  link: z.string()
    .nullish(),
});

export const NavigationSchema = z.array(
  NavItemSchema.extend({
    navItems: z.array(NavItemSchema),
  })
);