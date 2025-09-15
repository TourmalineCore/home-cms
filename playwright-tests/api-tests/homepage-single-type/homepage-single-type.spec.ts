import qs from "qs";
import { ApiTestFixtures, expect, test } from "../../api-test-fixtures";
import { cleanupHomepageSingleTypeApi, updateHomepageSingleTypeApi, HOMEPAGE_ENDPOINT } from "./homepage-single-type-api";
import { HomepageSchema } from "./homepage-single-type-schema";

test.describe(`Homepage single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupHomepageSingleTypeApi({
      apiRequest 
    });

    await updateHomepageSingleTypeApi({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupHomepageSingleTypeApi({
      apiRequest 
    });
  });

  test(`
      GIVEN an empty homepage single type
      WHEN call method PUT ${HOMEPAGE_ENDPOINT}
      AND call method GET ${HOMEPAGE_ENDPOINT}
      SHOULD get a correct response
      `,
  checkHomepageSingleTypeResponseTest
  );
});

async function checkHomepageSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const queryParams = {
    populate: [
      `blocks.gallery`,
      `blocks.featuredCards.cardWithPoints.points`,
      `blocks.featuredCards.cardWithPoints.link`,
      `blocks.featuredCards.cardWithImage.image`,
      `blocks.featuredCards.wideCard.wideCardItems.icon`,
      `blocks.featuredCards.wideCard.link`,
      `blocks.images`,
      `blocks.image`,
      `blocks.columnsWithContent.columnWithImage.image`,
      `blocks.columnsWithContent.columnWithRepositories.repositories`,
      `blocks.columnsWithContent.columnWithTextAndDate`,
      `seo`
    ]
  };
  
  const homepageResponse = await apiRequest(`${HOMEPAGE_ENDPOINT}?${qs.stringify(queryParams)}`);
  const homepageData = await homepageResponse.json();
  
  await expect(() => {
    HomepageSchema.parse(homepageData.data)
  }, `Homepage response is correct`)
    .not
    .toThrow()
}