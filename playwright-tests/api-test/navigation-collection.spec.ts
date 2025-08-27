import { z } from "zod";
import { ApiTestFixtures, expect, test } from "./api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../constants";
import { HttpStatusCode } from "../enums";

const NAME = `${API_SMOKE_NAME_PREFIX} Services`;
const LINK = `/services`;
const ENDPOINT = `/api/navigations`;

const NavItemSchema = z.object({
  name: z.string(),
  link: z.string()
    .nullish(),
  showInHeader: z.boolean(),
});

const NavigationSchema = z.array(
  NavItemSchema.extend({
    navItems: z.array(NavItemSchema)
      .default([]),
  })
);

test.describe(`Navigation response tests`, () => {
  test.beforeEach(async ({
    apiRequest
  }) => {
    await deleteNavigationRecord({
      apiRequest
    });

    await createNavigationRecord({
      apiRequest
    });
  });

  test.afterEach(async ({
    apiRequest
  }) => {
    await deleteNavigationRecord({
      apiRequest
    });
  }); 

  test(`
      GIVEN an empty navigation collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
  checkNavigationResponseTest 
  );
})

async function checkNavigationResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const navigation = await getNavigationData({
    apiRequest
  });

  await expect(() => {
    NavigationSchema.parse(navigation)
  }, `Navigation response is correct`)
    .not
    .toThrow()
}

async function createNavigationRecord({
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

    await expect(response.status(), `Navigation should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to create test navigation: ${error.message}`)
  }
}

async function deleteNavigationRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const navigation = await getNavigationData({
      apiRequest
    });

    const testNavigation = navigation.find((navigation) => navigation.name === NAME);

    if (testNavigation) {
      const response = await apiRequest(`${ENDPOINT}/${testNavigation.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Navigation should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test navigation: ${error.message}`)
  }
}

async function getNavigationData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}