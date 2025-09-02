import z from "zod";
import { createSocialNetworkRecord, deleteSocialNetworkRecord, SocialNetworksSchema } from "./social-networks-collection.spec";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { HttpStatusCode } from "../enums";

const LayoutSchema = z.object({
  header: z.object({
    buttonLabel: z.string(),
    emailCaption: z.string(),
    emailAddress: z.string(),
    socialLinks: SocialNetworksSchema.default([])
  })
});

const ENDPOINT = `/api/layout`;

test.describe(`Layout single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await updateLayoutSingleType({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleType({
      apiRequest 
    });

    await deleteSocialNetworkRecord({
      apiRequest
    })
  });

  test(`
      GIVEN an empty layout single type
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
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
  const layoutResponse = await apiRequest(`${ENDPOINT}?populate=*`);
  const layoutData = await layoutResponse.json();

  await expect(() => {
    LayoutSchema.parse(layoutData.data)
  }, `Layout response is correct`)
    .not
    .toThrow()
}

async function updateLayoutSingleType({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const socialLinkId = await createSocialNetworkRecord({
      apiRequest
    }); 

    const response = await apiRequest(ENDPOINT, {
      method: `put`,
      data: {
        data: {
          header: {
            buttonLabel: `buttonLabel`,
            emailCaption: `emailCaption`,
            emailAddress: `emailAddress`,
            socialLinks: [socialLinkId]
          }
        },
      }
    });

    await expect(response.status(), `Layout single type should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test layout single type: ${error.message}`)
  }
}

async function cleanupLayoutSingleType({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: `delete`
    });

    await expect(response.status(), `Layout single type should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test layout single type: ${error.message}`)
  }
}