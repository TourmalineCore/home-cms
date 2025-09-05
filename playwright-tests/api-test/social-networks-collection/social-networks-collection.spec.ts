import { ApiTestFixtures, expect, test } from "../api-test-fixtures";
import { SocialNetworksSchema } from "./social-networks-collection-schema";
import { cleanupSocialNetworkRecord, createSocialNetworkRecord, getSocialNetworksData, SOCIAL_NETWORKS_ENDPOINT } from "./social-networks-collection-api";

test.describe(`Social networks response tests`, () => {
  test.beforeEach(async ({
    apiRequest
  }) => {
    await cleanupSocialNetworkRecord({
      apiRequest
    });

    await createSocialNetworkRecord({
      apiRequest
    });
  });

  test.afterEach(async ({
    apiRequest
  }) => {
    await cleanupSocialNetworkRecord({
      apiRequest
    });
  }); 

  test(`
      GIVEN an empty social networks collection
      WHEN call method POST ${SOCIAL_NETWORKS_ENDPOINT}
      AND call method GET ${SOCIAL_NETWORKS_ENDPOINT}
      SHOULD get a correct response
      `,
  checkSocialNetworksResponse 
  );
})

async function checkSocialNetworksResponse({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const socialNetworks = await getSocialNetworksData({
    apiRequest
  });

  await expect(() => {
    SocialNetworksSchema.parse(socialNetworks)
  }, `Social networks response is correct`)
    .not
    .toThrow()
}