import z from "zod";

const NavItemSchema = z.object({
  name: z.string(),
  link: z.string()
});

export const NavigationSchema = z.array(
  z.object({
    isMultiLevelNavigation: z.boolean(),
    name: z.string(),
    link: z.string()
      .nullish(),
    navItems: z.array(NavItemSchema),
  })
)