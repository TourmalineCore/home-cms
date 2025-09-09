import type { Schema, Struct } from '@strapi/strapi';

export interface FooterFooterNavigationList extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_navigation_lists';
  info: {
    displayName: 'footerNavigationList';
  };
  attributes: {
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    isSocialNetworks: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    links: Schema.Attribute.Relation<'oneToMany', 'api::navigation.navigation'>;
    socialLinks: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-network.social-network'
    >;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    emailCaption: Schema.Attribute.String;
    navigationLists: Schema.Attribute.Component<
      'footer.footer-navigation-list',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    emailCaption: Schema.Attribute.String;
    navigationLists: Schema.Attribute.Relation<
      'oneToMany',
      'api::navigation.navigation'
    >;
    socialLinks: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-network.social-network'
    >;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    gallery: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.footer-navigation-list': FooterFooterNavigationList;
      'shared.footer': SharedFooter;
      'shared.header': SharedHeader;
      'shared.hero': SharedHero;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
