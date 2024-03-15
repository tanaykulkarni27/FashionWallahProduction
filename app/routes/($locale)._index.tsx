import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import BannerCarousel, {
  links as FadeLinks,
} from '~/components/fadeCarousel/BannerCarousel';

// MOCK DATA IMPORTS
import RatingFeed from '~/components/RatingFeed';
import {InfiniteMarquee} from '~/components/UIAcernity/InfiniteMarquee';

import {
  TEST_RATING_DATA,
  TEST_COLLECTIONS,
  HOME_BANNER_DATA,
} from '../testData/ComponentTestingData';
import {links} from '~/components/HomePage';

export const headers = routeHeaders;

export async function loader({params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;
  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });

  const seo = seoPayload.home();

  return defer({
    shop,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <div className='bg-red-500'>
      {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}
      <div className='block'>
        <BannerCarousel Banner_Data={HOME_BANNER_DATA}/>
      </div>
      <div className="w-full h-[100px] bg-gradient-to-b from-[#f0ab6e] to-white m-0"></div>
      <div className="off_white_white">
        {featuredProducts && (
          <Suspense>
            <Await resolve={featuredProducts}>
              {({products}) => {
                if (!products?.nodes) return <></>;
                return (
                  <ProductSwimlane
                    products={products}
                    title="Featured Products"
                    count={4}
                  />
                );
              }}
            </Await>
          </Suspense>
        )}
      </div>

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      <div className="trans_taupe pb-20">
        <ReviewsNRating
          count={[1407, 23123]}
          label={['reviews', 'happy customers']}
        />
        {/* <div className="flex justify-center items-center">
          <InfiniteMarquee
            items={TEST_RATING_DATA}
            direction="left"
            speed="slow"
          />
        </div> */}
      </div>
      <div className="taupe-dark p-3">
        <p className="text-2xl mb-2">Shop by collections</p>

        {/* EARRINGS COLLECTION  */}
        <div>
          <p className="text-3xl mb-2">Earrings</p>
          {featuredProducts && (
            <Suspense>
              <Await resolve={featuredProducts}>
                {/* {({products}) => {
              if (!products?.nodes) return <></>;
              // const x =
            }} */}
                {({products}) => {
                  if (!products?.nodes) return <></>;
                  return (
                    <ProductSwimlane
                      products={products}
                      title="" // no need of collection name as it is mentioned above
                      count={4}
                    />
                  );
                }}
              </Await>
            </Suspense>
          )}
        </div>

        {/* Immitation Jwellery COLLECTION  */}
        <div>
          <p className="text-3xl mb-2">Immitation Jwellery</p>
          {featuredProducts && (
            <Suspense>
              <Await resolve={featuredProducts}>
                {/* {({products}) => {
              if (!products?.nodes) return <></>;
              // const x =
            }} */}
                {({products}) => {
                  if (!products?.nodes) return <></>;
                  return (
                    <ProductSwimlane
                      products={products}
                      title="" // no need of collection name as it is mentioned above
                      count={4}
                    />
                  );
                }}
              </Await>
            </Suspense>
          )}
        </div>

        {/* Bangales COLLECTION  */}
        <div>
          <p className="text-3xl mb-2">Bangales</p>
          {featuredProducts && (
            <Suspense>
              <Await resolve={featuredProducts}>
                {/* {({products}) => {
              if (!products?.nodes) return <></>;
              // const x =
            }} */}
                {({products}) => {
                  if (!products?.nodes) return <></>;
                  return (
                    <ProductSwimlane
                      products={products}
                      title="" // no need of collection name as it is mentioned above
                      count={4}
                    />
                  );
                }}
              </Await>
            </Suspense>
          )}
        </div>
      </div>
      {/* {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )} */}
      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}
    </div>
  );
}

// ADDITION COMPONENT

function ReviewsNRating({
  count,
  label,
}: {
  count: number[];
  label: string[];
}): React.JSX.Element {
  return (
    <div className="text-center flex row_to_col justify-center items-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-700 to-indigo-950 mb-15">
      <div className="flex flex-col justify-center items-center mx-20 my-10">
        <p className="text-5xl">{count[0]}</p>
        <p className="text-xl">{label[0]} </p>
      </div>
      <div
        title=""
        className="flex flex-col justify-center items-center mx-20 my-10"
      >
        <p className="text-5xl">{count[1]}</p>
        <p className="text-xl">{label[1]}</p>
      </div>
    </div>
  );
}



const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 10,
      sortKey: UPDATED_AT
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
