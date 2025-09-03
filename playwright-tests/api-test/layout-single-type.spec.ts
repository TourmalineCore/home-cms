import z from "zod";
import { createSocialNetworkRecord, cleanupSocialNetworkRecord, SocialNetworksSchema } from "./social-networks-collection.spec";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { HttpStatusCode } from "../enums";
import { createFooterNavigationRecord, cleanupFooterNavigationRecord, FooterNavigationSchema } from "./footer-navigation-collection.spec";
import qs from "qs";

const LayoutSchema = z.object({
  emailAddress: z.string(),
  header: z.object({
    buttonLabel: z.string(),
    emailCaption: z.string(),
    socialLinks: SocialNetworksSchema
  }),
  footer: z.object({
    emailCaption: z.string(),
    navigationLists: z.array(z.object({
      caption: z.string(),
      isSocialNetworks: z.boolean(),
      links: FooterNavigationSchema,
      socialLinks: SocialNetworksSchema
    }))
  })
});

const ENDPOINT = `/api/layout`;

test.describe(`Layout single type response tests`, () => {
  test.beforeEach(async ({
    apiRequest 
  }) => {
    await cleanupLayoutSingleType({
      apiRequest 
    });

    await cleanupSocialNetworkRecord({
      apiRequest
    })

    await cleanupFooterNavigationRecord({
      apiRequest
    })
    
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

    await cleanupSocialNetworkRecord({
      apiRequest
    })

    await cleanupFooterNavigationRecord({
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
  const queryParams = {
    populate: [
      `header.socialLinks`,
      `footer.navigationLists`,
      `footer.navigationLists.links`,
      `footer.navigationLists.socialLinks`,
    ],
  };
  
  const layoutResponse = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
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
    
    const footerNavigationId = await createFooterNavigationRecord({
      apiRequest
    })

    const response = await apiRequest(ENDPOINT, {
      method: `put`,
      data: {
        data: {
          emailAddress: `emailAddress`,
          header: {
            buttonLabel: `buttonLabel`,
            emailCaption: `emailCaption`,
            socialLinks: [socialLinkId]
          },
          footer: {
            emailCaption: `emailCaption`,
            navigationLists: [
              {
                caption: `caption`,
                isSocialNetworks: false,
                links: [footerNavigationId],
              },
              {
                caption: `caption 2`,
                isSocialNetworks: true,
                socialLinks: [socialLinkId]
              }
            ]
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