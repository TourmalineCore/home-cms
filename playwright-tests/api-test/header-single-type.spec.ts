import z from "zod";
import { createSocialNetworkRecord, deleteSocialNetworkRecord, SocialNetworksSchema } from "./social-networks-collection.spec";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { HttpStatusCode } from "../enums";

const HeaderSchema = z.object({
  buttonLabel: z.string(),
  emailCaption: z.string(),
  emailAddress: z.string(),
  socialLinks: SocialNetworksSchema.default([])
});

const ENDPOINT = `/api/header`;

test.describe(`Header single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await updateHeaderSingleType({
      apiRequest 
    });
  });

  test.afterEach(async ({
    apiRequest 
  }) => {
    await cleanupHeaderSingleType({
      apiRequest 
    });

    await deleteSocialNetworkRecord({
      apiRequest
    })
  });

  test(`
      GIVEN an empty header single type
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
  checkHeaderSingleTypeResponseTest
  );
});

async function checkHeaderSingleTypeResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const headerResponse = await apiRequest(`${ENDPOINT}?populate=*`);
  const headerData = await headerResponse.json();

  await expect(() => {
    HeaderSchema.parse(headerData.data)
  }, `Header response is correct`)
    .not
    .toThrow()
}

async function updateHeaderSingleType({
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
          buttonLabel: `buttonLabel`,
          emailCaption: `emailCaption`,
          emailAddress: `emailAddress`,
          socialLinks: [socialLinkId]
        },
      }
    });

    await expect(response.status(), `Header single type should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test header single type: ${error.message}`)
  }
}

async function cleanupHeaderSingleType({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: `delete`
    });

    await expect(response.status(), `Header single type should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test header single type: ${error.message}`)
  }
}