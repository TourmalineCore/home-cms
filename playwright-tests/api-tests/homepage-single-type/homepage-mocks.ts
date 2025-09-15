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

function getCollageWithTitleMock({
  imageId
}) {
  return {
    __component: `shared.collage-with-title`,
    title: `collage title`,
    images: [imageId, imageId]
  }
}

function getCollageWithLinkMock({
  imageId
}) {
  return {
    __component: `shared.collage-with-link`,
    link: {
      text: `Collage with link`,
      url: `/`
    },
    images: [imageId, imageId]
  }
}

function getSignpostMultipleMock({
  imageId
}) {
  return {
    __component: `shared.signpost-multiple`,
    title: `Signpost Multiple title`,
    link: {
      text: `Signpost Multiple link`,
      url: `/`
    },
    signposts: [
      {
        title: `signpost title`,
        subtitle: `signpost subtitle`,
        link: `/`,
        image: imageId,
      }
    ]
  }
}

function getSingleImageMock({
  imageId
}) {
  return {
    __component: `shared.single-image`,
    image: imageId
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
      }),
      getCollageWithTitleMock({
        imageId
      }),
      getCollageWithLinkMock({
        imageId
      }),
      getSignpostMultipleMock({
        imageId
      }),
      getSingleImageMock({
        imageId
      })
    ],
    seo: {
      metaTitle: `metaTitle`,
      metaDescription: `metaDescription`
    }
  }
}
