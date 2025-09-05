import { expect } from "@playwright/test";
import { API_SMOKE_NAME_PREFIX } from "../../constants";
import { HttpStatusCode } from "../../enums";
import { ApiTestFixtures } from "../api-test-fixtures";

const NAME = `${API_SMOKE_NAME_PREFIX} Footer link`;
const LINK = `/footer-link`;
export const FOOTER_NAVIGATION_ENDPOINT = `/api/footer-navigations`;


export async function createFooterNavigationRecord({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  try {
    const response = await apiRequest(FOOTER_NAVIGATION_ENDPOINT, {
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
      const response = await apiRequest(`${FOOTER_NAVIGATION_ENDPOINT}/${footerNavigation.documentId}`, {
        method: `delete`
      });

      await expect(response.status(), `Footer navigation should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test footer navigation: ${error.message}`)
  }
}

export async function getFooterNavigationData({
  apiRequest
}: {
  apiRequest: ApiTestFixtures[`apiRequest`];
}) {
  const response = await apiRequest(`${FOOTER_NAVIGATION_ENDPOINT}?populate=*`);
  const responseData = await response.json();

  return responseData.data;
}