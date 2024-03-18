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
  HOME_BANNER_DATA,
} from '../testData/ComponentTestingData';
import {links} from '~/components/HomePage';
import FeaturedCollection from '~/components/FeaturedCollection/FeaturedCollection';
import CollectionCard from '~/components/CollectionCard';

export const headers = routeHeaders;

export async function loader({params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;
  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });

  // FEATURED COLLECTION CODE
  const featured_collection_names = [
    {
      handle:'natural-stone-bracelet',
      title:'Natural Stone Bracelet'
    },
    {
      handle:'a-d-stone-bracelets',
      title:'A D Bracelets'
    },
    {handle:'chain-pendant',
    title:'Chain Pendant'}
  ]
  const featured_collection = [] 
  for(const collection_name of featured_collection_names){
    var products_of_collection = await context.storefront.query(COLLECTION_QUERY,{
      variables:{handle:collection_name.handle}
    })
    featured_collection.push({
      title:collection_name.title,
      products:products_of_collection.collection.products
    })
  }

// SHOP BY COLLECTION CODE
    const shop_by_collection = [] 
    var products_of_collection = await context.storefront.query(COLLECTION_QUERY,{
      variables:{handle:'mangalsutra'}
    })
    shop_by_collection.push({
      title:'Mangalsutra',
      products:products_of_collection.collection.products
    })

// All_Collections
    const COLLECTION_TYPES = []
    var sub_collection = await context.storefront.query(All_Collections,{
      variables:{MainType:'jhumkas OR Earrings OR studs OR bali'}});
      COLLECTION_TYPES.push({title:'Earring',sub_collections:sub_collection.collections.edges});
    sub_collection = await context.storefront.query(All_Collections,{
        variables:{MainType:'necklace'}});
        COLLECTION_TYPES.push({title:'Necklace',sub_collections:sub_collection.collections.edges});  

  const seo = seoPayload.home();

  return defer({
    COLLECTION_TYPES,
    shop_by_collection,
    featured_collection,
    shop,
    primaryHero: hero,
    // Thes different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
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
    featuredProducts,
    featured_collection,
    shop_by_collection,
    COLLECTION_TYPES
  } = useLoaderData<typeof loader>();

  // console.log(COLLECTION_TYPES);

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <div className=''>
      {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}
      <div className='block'>
        <BannerCarousel Banner_Data={HOME_BANNER_DATA}/>
      </div>
      <div className="w-full h-[3vh] bg-gradient-to-b from-[#f0ab6e] to-white m-0"></div>
      <div className="off_white_white w-full hiddenScroll p-3">
        <FeaturedCollection FeaturedCollection={featured_collection}/>
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
        <div className="flex justify-center items-center">
          <InfiniteMarquee
            items={TEST_RATING_DATA}
            direction="left"
            speed="slow"
          />
        </div>
      </div>
      <div className="taupe-dark py-3">
        <div className='flex flex-row justify-center items-center'>
          <marquee className="text-2xl mb-2 text-center w-fit">
            Shop by collections
          </marquee>
        </div>
        {COLLECTION_TYPES.map((sub_collection,index)=>(
          <div className='text-center mt-4' key={"hello world " + index}>
              <p className="text-2xl mb-2 text-center w-full">{sub_collection.title}</p>
              <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12 z-0">
                {sub_collection.sub_collections.map((collection)=>(<CollectionCard collection={collection.node}/>))}
              </div>
            </div>)
        )}
        {shop_by_collection.map((collection,index)=>(
          <div className='text-center mt-4' key={"hello world " + index}>
            <p className="text-2xl mb-2 text-center w-full">{collection.title}</p>
            <ProductSwimlane
              products={collection.products}
              title={null} // no need of collection name as it is mentioned above
            />
            </div>)
        )}
        
      </div>
      
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
    <div className="text-center flex md:flex-row flex-col justify-center items-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-700 to-indigo-950 md:mb-15 mb-4">
      <div className="flex flex-col justify-center items-center mx-20 my-6">
        <p className="text-5xl">{count[0]}</p>
        <p className="text-xl">{label[0]} </p>
      </div>
      <div
        title=""
        className="flex flex-col justify-center items-center mx-20 my-6"
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
      }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
query AllProducts($handle: String!) {
  collection(handle: $handle) {
    handle
    products(first: 100) {
      nodes {
          ...ProductCard
        }
    }
  }
}
${PRODUCT_CARD_FRAGMENT}
`;

const All_Collections = `#graphql
query AllProducts($MainType:String){
  collections(first: 250, query: $MainType) {
    edges {
      node {
        id
        title
        handle
        image{
          id
          url
          altText
          width
          height
        }
      }
    }
  }
}
`