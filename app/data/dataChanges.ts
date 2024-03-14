// To be mutated to GraphQL
export const OFFER_DATA = [
  {
    id: 'offer-1',
    text: 'Free shipping on orders over $50!',
  },
  {
    id: 'offer-2',
    text: '20% off sitewide for new customers!',
  },
  {
    id: 'offer-3',
    text: 'Flash sale: 50% off select items!',
  },
  {
    id: 'offer-4',
    text: 'Up to 70% off clearance items!',
  },
];

export const OFFERS_QUERY = `#graphql
query Offers {
  metaobject(
    handle: {handle: "offers-announcement-bar-u7shqoz9", type: "offers_announcement_bar"}
  ) {
    id
    fields {
      value
    }
  }
}` as const;

export const clx = `#graphql
query Earrings {
  collections(
    sortKey: RELEVANCE
    query: "bali OR studs OR jhumkas OR earrings"
    first: 10
  ) {
    nodes {
      id
      title
      handle
      image {
        altText
        width
        height
        url
      }
    }
  }
}
query Necklace {
  collections(
    sortKey: RELEVANCE
    query: "necklace OR choker OR kundan"
    first: 10
  ) {
    nodes {
      id
      title
      handle
      image {
        altText
        width
        height
        url
      }
    }
  }
}

` as const;
