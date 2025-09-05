import { ApiTestFixtures, expect, test } from "../api-test-fixtures";
import { cleanupFooterNavigationRecord, createFooterNavigationRecord, FOOTER_NAVIGATION_ENDPOINT, getFooterNavigationData } from "./footer-navigation-collection-api";
import { FooterNavigationSchema } from "./footer-navigation-collection-schema";


test.describe(`Footer navigation response tests`, () => {
  test.beforeEach(async ({
    apiRequest
  }) => {
    await cleanupFooterNavigationRecord({
      apiRequest
    });

    await createFooterNavigationRecord({
      apiRequest
    });
  });

  test.afterEach(async ({
    apiRequest
  }) => {
    await cleanupFooterNavigationRecord({
      apiRequest
    });
  }); 

  test(`
      GIVEN an empty footer navigation collection
      WHEN call method POST ${FOOTER_NAVIGATION_ENDPOINT}
      AND call method GET ${FOOTER_NAVIGATION_ENDPOINT}
      SHOULD get a correct response
      `,
  checkFooterNavigationResponse 
  );
})

async function checkFooterNavigationResponse({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const footerNavigation = await getFooterNavigationData({
    apiRequest
  });

  await expect(() => {
    FooterNavigationSchema.parse(footerNavigation)
  }, `Footer navigation response is correct`)
    .not
    .toThrow()
}
