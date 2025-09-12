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

const FeaturedCardsListSchema = z.object({
  __component: z.literal(`shared.featured-cards-list`),
  id: z.number(),
  title: z.string(),
  featuredCards: z.array(
    z.object({
      id: z.number(),
      type: z.enum([
        `points`,
        `image`,
        `wide`,
        `blank`
      ]),
      cardWithImage: z.object({
        theme: z.enum([
          `blue`,
          `white`,
          `grey`,
        ]),
        image: z.object({
          url: z.string()
        })
      })
        .nullish(),
      cardWithPoints: z.object({
        theme: z.enum([
          `black`,
          `white`,
          `grey`,
        ]),
        title: z.string(),
        link: z.object({
          text: z.string(),
          url: z.string(),
        }),
        points: z.array(
          z.object({
            text: z.string(),
          })
        ) 
      })
        .nullish(),
      wideCard: z.object({
        title: z.string(),
        description: z.string(),
        wideCardItems: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            link: z.string(),
            icon: z.object({
              url: z.string(),
            })
          })),
        link: z.object({
          text: z.string(),
          url: z.string(),
        }),
      })
        .nullish(),
    }))
});

const CollageWithTitleSchema = z.object({
  __component: z.literal(`shared.collage-with-title`),
  title: z.string(),
  images: z.array(z.object({
    url: z.string()
  }))
})


const SignpostMultipleSchema = z.object({
  __component: z.literal(`shared.signpost-multiple`),
  title: z.string(),
  link: z.object({
    text: z.string(),
    url: z.string(),
  })
    .nullish(),
  signposts: z.array(z.object({
    title: z.string(),
    subtitle: z.string(),
    link: z.string(),
    image: z.object({
      url: z.string()
    })
  }))
    .nullish()
})

const SingleImageSchema = z.object({
  __component: z.literal(`shared.single-image`),
  image: z.object({
    url: z.string()
  })
})

export const HomepageSchema = z.object({
  id: z.number(),
  blocks: z.array(
    z.discriminatedUnion(
      `__component`,
      [
        HeroSchema,
        CollageWithTitleSchema,
        FeaturedCardsListSchema,
        SignpostMultipleSchema,
        SingleImageSchema
      ]
    )
  ),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.string()
      .nullish()
  })
});

