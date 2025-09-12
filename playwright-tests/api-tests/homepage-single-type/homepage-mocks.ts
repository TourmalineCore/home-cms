function getHeroMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.hero`,
    title: `title`,
    description: `description`,
    gallery: [imageId],
  }
}

function getFeaturedCardsListMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    __component: `shared.featured-cards-list`,
    title: `title`,
    featuredCards: [
      {
        type: `points`,
        cardWithPoints: {
          title: `cardWithPoints title`,
          link: {
            text: `cardWithPoints link`,
            url: `/`
          },
          theme: `white`,
          points: [
            {
              text: `point 1`
            },
            {
              text: `point 2`
            }
          ]
        }
      },
      {
        type: `image`,
        cardWithImage: {
          theme: `blue`,
          image: imageId,
        }
      },
      {
        type: `blank`,
      },
      {
        type: `wide`,
        wideCard: {
          title: `wideCard title`,
          description: `wideCard description`,
          wideCardItems: [
            {
              name: `Frontend`,
              link: `/frontend`,
              icon: imageId,
            },
            {
              name: `Backend`,
              link: `/backend`,
              icon:  imageId,
            }
          ],
          link: {
            text: `wideCard link`,
            url: `/`
          },
        },
      }
    ],
  }
}

export function getHomeMock({
  imageId
}: {
  imageId: number;
}) {
  return {
    blocks: [
      getHeroMock({
        imageId
      }),
      getFeaturedCardsListMock({
        imageId
      })
    ],
    seo: {
      metaTitle: `metaTitle`,
      metaDescription: `metaDescription`
    }
  }
}
