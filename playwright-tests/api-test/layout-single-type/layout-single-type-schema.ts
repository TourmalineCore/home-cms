import z from "zod";
import { NavigationSchema } from "../navigation-collection/navigation-collection-schema";
import { SocialNetworksSchema } from "../social-networks-collection/social-networks-collection-schema";
import { FooterNavigationSchema } from "../footer-navigation-collection/footer-navigation-collection-schema";

export const LayoutSchema = z.object({
  emailAddress: z.string(),
  header: z.object({
    buttonLabel: z.string(),
    emailCaption: z.string(),
    socialLinks: SocialNetworksSchema,
    navigationLists: NavigationSchema
  }),
  footer: z.object({
    emailCaption: z.string(),
    navigationLists: z.array(z.object({
      caption: z.string(),
      isSocialNetworks: z.boolean(),
      links: FooterNavigationSchema,
      socialLinks: SocialNetworksSchema
    }))
  })
});