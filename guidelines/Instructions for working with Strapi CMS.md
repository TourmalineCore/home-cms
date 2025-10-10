# Instructions for managing content on the home site via CMS Strapi

## Content:
1. [General information](#general-information)<br/>
    1.1. [Draft and published version of the content](#draft-and-published)<br/>
    1.2. [Filling in content in different languages](#different-languages)<br/>
2. [Existing components](#existing-components)
3. [Navigation](#navigation)
4. [Social network](#social-networks)
5. [Homepage](#homepage)
6. [Layout](#layout)

<h2 id="general-information">1. General information</h2>

<h3 id="draft-and-published">1.1. Draft and published version of the content</h3>
All content in the CMS has a draft version and a published version.

- The published version is visible to everyone.
- The draft version can be viewed in the CMS or in the preview mode.

You can switch between them.

![alt text](./images/draft-and-published-version.png)

To view the content in draft mode and not publish it, you need to click on the "Save" button, and then "Open draft preview".

![alt text](./images/preview-mode.png)

<h3 id="different-languages">1.2. Filling in content in different languages</h3>

All CMS content can be filled in in different languages, and you can select the language using the language switch.

![alt text](./images/language-switch.png)

To fill in content in different languages, fill in the content in one language first, save it, and then switch to another language.

If you want to transfer all the completed content from another language so as not to fill everything in from the beginning, click on the button next to the language switch.

![alt text](./images/transferring-content-from-another-language-1.png)

In the window that opens, select the language you want to copy the content from and confirm your choice.

![alt text](./images/transferring-content-from-another-language-2.png)

<h2 id="existing-components">2. Existing Components</h2>

1. [Hero](https://www.tourmalinecore.com/components/hero)

2. [FeaturedCardList](https://www.tourmalinecore.com/components/services)

3. [CollageWithTitle](https://www.tourmalinecore.com/components/collage-with-title)

4. [CollageWithLink](https://www.tourmalinecore.com/components/collage-with-link)

5. [SignpostMultiple](https://www.tourmalinecore.com/components/signpost-multiple)

6. [SingleImage](https://www.tourmalinecore.com/components/single-image)

7. ShowCasesGrid:</br>
  7.1. [With markdown columns](https://www.tourmalinecore.com/components/projects-with-text-block)</br> 
  7.2. [Three columns](https://www.tourmalinecore.com/components/projects-with-three-cards)</br>
  7.3. [Four columns](https://www.tourmalinecore.com/components/projects-with-four-cards)

8. [ThreeColumnGrid](https://www.tourmalinecore.com/components/cards-grid)

9. [Form](https://www.tourmalinecore.com/components/form-block)

<h2 id="navigation">3. Navigation</h2>

<h3 id="location-navigation-tab">Location of the navigation tab</h3>

To get to the navigation tab, first you need to go to the content manager tab.

![alt text](./images/content-manager-tab.png)

Then go to the navigation tab.

![alt text](./images/navigation-tab.png)

<h3 id="create-single-level-navigation">Creating a single-level navigation</h3>

To create a single-level navigation, click the "Create new entry" button in the navigation tab.

![alt text](./images/navigation-create-new-entry-btn.png)

To create a single-level navigation, fill in the `name`, `link` field and set false in `isMultiLevelNavigation`.

Then click on the publish button.

![alt text](./images/creating-single-level-navigation.png)

<h3 id="create-multi-level-navigation">Creating multi-level navigation</h3>

To create a multi-level navigation, click the "Create new entry" button in the navigation section.

![alt text](./images/navigation-create-new-entry-btn.png)

![alt text](./images/creating-multi-level-navigation.png)

To create multi-level navigation, fill in the `name`, set **true** in `isMultiLevelNavigation` and select the navigation that you want to attach in `navItems` field.

Then click on the publish button.

>You can only attach single-level navigation in navItems. Attaching multi-level will not work here.

<h3 id="add-navigation-to-header">Adding navigation to header</h3> 

To see the added navigation in the site header, go to the **Layout** tab and add the desired navigation in the `navigationLists` header field.

Then click on the publish button.

![alt text](./images/adding-navigation-to-header.png)

<h3 id="add-navigation-to-footer">Adding navigation to footer</h3>

To see the added navigation in the site footer, go to the **Layout** tab and do the following:

1. Add section with navigation in `navigationLists`
2. Fill `caption` and set **false** in `isSocialNetworks` field
3. Add the desired navigation in the `links`

![alt text](./images/adding-navigation-to-footer.png)

<h2 id="social-networks">4. Social networks</h2>

<h3 id="location-social-networks-tab">Location of the social networks tab</h3>

To get to the social network tab, first you need to go to the content manager tab.

![alt text](./images/content-manager-tab.png)

Then go to the social networks tab.

![alt text](./images/social-networks-tab.png)

<h3 id="create-social-networks">Creating a social network</h3>

To create a social network, click the "Create new entry" button in the social networks tab.

![alt text](./images/social-networks-create-new-entry-btn.png)

To create a social network, fill in the fields `name`, `link`.

Then click on the publish button.

![alt text](./images/creating-social-networks.png)

<h3 id="add-social-networks-to-header">Adding social networks to header</h3> 

To see the added social networks in the site header, go to the **Layout** tab and add the desired social networks in the `socialLinks` header field.

Then click on the publish button.

![alt text](./images/adding-social-networks-to-header.png)

<h3 id="add-social-networks-to-footer">Adding social networks to footer</h3>

To see the added social networks in the site footer, go to the **Layout** tab and do the following:

1. Add section with navigation in `navigationLists`
2. Fill `caption` and set **true** in `isSocialNetworks` field
3. Add the desired social networks in the `socialLinks`

![alt text](./images/adding-social-networks-to-footer.png)

<h2 id="homepage">5. Homepage</h2>

<h3 id="location-homepage-tab">Location of the homepage tab</h3>

To get to the homepage tab, first you need to go to the content manager tab.

![alt text](./images/content-manager-tab.png)

Then go to the homepage tab.

![alt text](./images/homepage-tab.png)

<h3 id="filling-in-the-homepage">Filling in the homepage</h3>

You can add components to the homepage by clicking on the "Add a component to blocks" button.

![alt text](./images/homepage-add-component-btn.png)

After that, you will see all the possible components, they can be added in any order and in any quantity.

The appearance of the components can be viewed in this [section](#existing-components).

![alt text](./images/homepage-all-components.png)

To publish a page, you need to complete seo so that the page is indexed well by search engines.

![alt text](./images/homepage-seo.png)

<h2 id="layout">6. Layout</h2>

<h3 id="location-layout-tab">Location of the layout tab</h3>

To get to the layout tab, first you need to go to the content manager tab.

![alt text](./images/content-manager-tab.png)

Then go to the layout tab.

![alt text](./images/layout-tab.png)

<h3 id="filling-in-the-layout">Filling in the layout</h3>

Layout contains a header and footer content.

The header has the fields `navigationLists` and `socialLinks`, they contain an entry from the [navigation](#navigation) and [social networks](#social-networks) section.

![alt text](./images/header-navigation-and-social-networks.png)

The footer in `navigationLists` has the fields `link` and `socialLinks`, they contain an entry from the [navigation](#navigation) and [social networks](#social-networks) section.

![alt text](./images/footer-links.png)

![alt text](./images/footer-social-links.png)

After filling in all the necessary fields, you can publish.