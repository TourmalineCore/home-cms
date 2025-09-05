import qs from "qs";
import { LayoutSchema } from "./layout-single-type-schema";
import { cleanupLayoutSingleTypeApi, LAYOUT_ENDPOINT, updateLayoutSingleTypeApi } from "./layout-single-type-api";
import { ApiTestFixtures, expect, test } from "../api-test-fixtures";
import { cleanupFooterNavigationRecord } from "../footer-navigation-collection/footer-navigation-collection-api";
import { cleanupSocialNetworkRecord } from "../social-networks-collection/social-networks-collection-api";
import { cleanupNavigationRecord } from "../navigation-collection/navigation-collection-api";

test.describe(`Layout single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleTypeApi({
      apiRequest 
    });

    await cleanupSocialNetworkRecord({
      apiRequest
    });
    
    await cleanupNavigationRecord({
      apiRequest
    });

    await cleanupFooterNavigationRecord({
      apiRequest
    });
    
    await updateLayoutSingleTypeApi({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleTypeApi({
      apiRequest 
    });

    await cleanupNavigationRecord({
      apiRequest
    });

    await cleanupSocialNetworkRecord({
      apiRequest
    });

    await cleanupFooterNavigationRecord({
      apiRequest
    });
  });

  test(`
      GIVEN an empty layout single type
      WHEN call method PUT ${LAYOUT_ENDPOINT}
      AND call method GET ${LAYOUT_ENDPOINT}
      SHOULD get a correct response
      `,
  checkLayoutSingleTypeResponseTest
  );
});

async function checkLayoutSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const queryParams = {
    populate: [
      `header.socialLinks`,
      `header.navigationLists`,
      `header.navigationLists.navItems`,
      `footer.navigationLists`,
      `footer.navigationLists.links`,
      `footer.navigationLists.socialLinks`,
    ],
  };
  
  const layoutResponse = await apiRequest(`${LAYOUT_ENDPOINT}?${qs.stringify(queryParams)}`);
  const layoutData = await layoutResponse.json();
  
  await expect(() => {
    LayoutSchema.parse(layoutData.data)
  }, `Layout response is correct`)
    .not
    .toThrow()
}