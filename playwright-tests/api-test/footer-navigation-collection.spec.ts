import { z } from "zod";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../constants";
import { HttpStatusCode } from "../enums";

const NAME = `${API_SMOKE_NAME_PREFIX} Footer link`;
const LINK = `/footer-link`;
const ENDPOINT = `/api/footer-navigations`;


export const FooterNavigationSchema = z.array(
  z.object({
    name: z.string(),
    link: z.string(),
  })
);

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
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
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

export async function createFooterNavigationRecord({
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

    await expect(response.status(), `Footer navigation should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
    const responseData =  await response.json();

    return responseData.data.id;
  } catch (error) {
    throw new Error(`Failed to create test footer navigation: ${error.message}`)
  }
}

export async function cleanupFooterNavigationRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const footerNavigationList = await getFooterNavigationData({
      apiRequest
    });

    const footerNavigation = footerNavigationList.find((footerNavigation) => footerNavigation.name === NAME);

    if (footerNavigation) {
      const response = await apiRequest(`${ENDPOINT}/${footerNavigation.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Footer navigation should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test footer navigation: ${error.message}`)
  }
}

async function getFooterNavigationData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}