import { z } from "zod";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../constants";
import { HttpStatusCode } from "../enums";

const NAME = `${API_SMOKE_NAME_PREFIX} Social Network`;
const LINK = `/socialNetworkLink`;
const ENDPOINT = `/api/social-networks`;


const SocialNetworksSchema = z.array(
  z.object({
    name: z.string(),
    link: z.string()
  })
);

test.describe(`Social networks response tests`, () => {
  test.beforeEach(async ({
    apiRequest
  }) => {
    await deleteSocialNetworkRecord({
      apiRequest
    });

    await createSocialNetworkRecord({
      apiRequest
    });
  });

  test.afterEach(async ({
    apiRequest
  }) => {
    await deleteSocialNetworkRecord({
      apiRequest
    });
  }); 

  test(`
      GIVEN an empty social networks collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
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

async function createSocialNetworkRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: `post`,
      data: {
        data: {
          name: NAME,
          link: LINK,
        }
      }
    });

    await expect(response.status(), `Social network should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to create test social network: ${error.message}`)
  }
}

async function deleteSocialNetworkRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const socialNetworks = await getSocialNetworksData({
      apiRequest
    });

    const testSocialNetworks= socialNetworks.find((socialNetwork) => socialNetwork.name === NAME);

    if (testSocialNetworks) {
      const response = await apiRequest(`${ENDPOINT}/${testSocialNetworks.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Social network should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test social network: ${error.message}`)
  }
}

async function getSocialNetworksData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}