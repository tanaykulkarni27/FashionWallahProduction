// To be mutated to GraphQL
export const OFFER_DATA = [
  {
    id: 'offer-1',
    text: 'Free Shipping on orders above 499/-',
  },
  {
    id: 'offer-2',
    text: 'Upto 30% off sitewide',
  },
  {
    id: 'offer-3',
    text: 'Additional discounts on every add on',
  },
  {
    id: 'offer-4',
    text: 'Same day dispatching',
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
