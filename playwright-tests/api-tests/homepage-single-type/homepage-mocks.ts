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

function getThreeColumnGridMock({
  imageId
}) {
  return {
    __component: `shared.three-column-grid`,
    columnsWithContent: [
      {
        type: `image`,
        columnWithImage: {
          title: `We teach at the university`,
          image: imageId,
          markdownText: `We talk about the basics of web architecture`,
        }
      },
      {
        type: `repositories`,
        columnWithRepositories: {
          title: `We do open source`,
          markdownText: `It is important for us to share experience`,
          repositories: [
            {
              name: `to-dos`,
              description: `description`,
              link: `/`,
              language: `C#`
            }
          ]
        },
      },
      {
        type: `text-and-date`,
        columnWithTextAndDate: {
          title: `We publish scientific research`,
          text: `Мethod for determining`,
          date: new Date(`2025-09-15`)
        }
      }
    ]
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
      }),
      getThreeColumnGridMock({
        imageId
      })
    ],
    seo: {
      metaTitle: `metaTitle`,
      metaDescription: `metaDescription`
    }
  }
}
