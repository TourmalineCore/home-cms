import { expect } from "@playwright/test";
import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures } from "../api-test-fixtures";
import { API_SMOKE_NAME_PREFIX } from "../../constants";

const NAME = `${API_SMOKE_NAME_PREFIX} Services`;
const LINK = `/services`;

export const NAVIGATION_ENDPOINT = `/api/navigations`;

export async function createNavigationRecordApi({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(NAVIGATION_ENDPOINT, {
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

    const responseData =  await response.json();

    return responseData.data.id;
  } catch (error) {
    throw new Error(`Failed to create test navigation: ${error.message}`)
  }
}

export async function cleanupNavigationRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const navigationList = await getNavigationData({
      apiRequest
    });

    const navigation = navigationList.find((navigation) => navigation.name === NAME);

    if (navigation) {
      const response = await apiRequest(`${NAVIGATION_ENDPOINT}/${navigation.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Navigation should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test navigation: ${error.message}`)
  }
}

export async function getNavigationData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${NAVIGATION_ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}