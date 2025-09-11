import type { Schema, Struct } from '@strapi/strapi';

export interface FeaturedCardCardWithImage extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_card_with_images';
  info: {
    displayName: 'cardWithImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['black', 'grey', 'blue']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'blue'>;
  };
}

export interface FeaturedCardCardWithPoints extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_card_with_points';
  info: {
    displayName: 'cardWithPoints';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    points: Schema.Attribute.Component<'shared.text', true> &
      Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['white', 'black', 'grey']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'white'>;
    title: Schema.Attribute.String;
  };
}

export interface FeaturedCardWideCard extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_wide_cards';
  info: {
    displayName: 'wideCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
    wideCardItems: Schema.Attribute.Component<
      'featured-card.wide-card-items',
      true
    >;
  };
}

export interface FeaturedCardWideCardItems extends Struct.ComponentSchema {
  collectionName: 'components_featured_card_wide_card_items';
  info: {
    displayName: 'wideCardItems';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface SharedFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_featured_cards';
  info: {
    displayName: 'featuredCard';
  };
  attributes: {
    cardWithImage: Schema.Attribute.Component<
      'featured-card.card-with-image',
      false
    > &
      Schema.Attribute.Required;
    cardWithPoints: Schema.Attribute.Component<
      'featured-card.card-with-points',
      false
    > &
      Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['points', 'image', 'blank', 'wide']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'points'>;
    wideCard: Schema.Attribute.Component<'featured-card.wide-card', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedFeaturedCardsList extends Struct.ComponentSchema {
  collectionName: 'components_shared_featured_cards_lists';
  info: {
    displayName: 'featuredCardsList';
  };
  attributes: {
    featuredCards: Schema.Attribute.Component<'shared.featured-card', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
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
    >;
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

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'featured-card.card-with-image': FeaturedCardCardWithImage;
      'featured-card.card-with-points': FeaturedCardCardWithPoints;
      'featured-card.wide-card': FeaturedCardWideCard;
      'featured-card.wide-card-items': FeaturedCardWideCardItems;
      'footer.footer-navigation-list': FooterFooterNavigationList;
      'shared.featured-card': SharedFeaturedCard;
      'shared.featured-cards-list': SharedFeaturedCardsList;
      'shared.footer': SharedFooter;
      'shared.header': SharedHeader;
      'shared.hero': SharedHero;
      'shared.link': SharedLink;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'shared.text': SharedText;
    }
  }
}
