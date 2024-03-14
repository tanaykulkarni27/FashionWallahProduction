import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

import FadeCarousel, {
  links as FadeCss,
} from '~/components/fadeCarousel/FadeCarousel';

import HorizontalCarousel, {
  links as HorizontalCss,
} from '../components/hozizontalCarousel/HorizontalCarousel';

import RatingFeed from './components/RatingFeed';
import {
  COLLECTIONS_QUERY,
  CollectionItem,
  CollectionsGrid,
} from './collections._index';

import {
  HOME_BANNER_DATA,
  TEST_COLLECTIONS,
  TEST_RATING_DATA,
} from '~/testData/ComponentTestingData';
// import {Statistic} from 'antd'
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const BANNER_IMAGES = collections.nodes;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  const all_collections = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: 4,
  });

  return defer({BANNER_IMAGES, recommendedProducts, all_collections});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="home">
      <FadeCarousel>
        {HOME_BANNER_DATA.map((item, index) => (
          <div key={item.id} className="m-0 p-0">
            <div
              className={'flex justify-center items-center m-0  ' + item.class}
            >
              <img
                src={item.image.url}
                key={item.image.id}
                className="rounded-md m-0 banner_image"
              />
            </div>
          </div>
        ))}
      </FadeCarousel>
      <div className="gap_filler"></div>
      {/*
       <HorizontalCarousel slides_to_show={[6,4,2]}>
        {YOUR_VIDEO_URLS.map((item, index) => (
              <div key={index} className="carousel-item rounded-lg">
                <Video
                  data={item}
                  className="rounded-xl"
                  style={{ width: "15vw", height: "auto" }}
                  autoPlay
                  loop
                  muted
                  
                />
              </div>
            ))}
      </HorizontalCarousel>
       */}

      <div className="off_white_white">Fetured collection data comes here</div>

      {/* <FeaturedCollection collection={data.featuredCollection} /> */}

      {/* <RecommendedProducts products={data.recommendedProducts} /> */}

      <div className="trans_taupe pb-20">
        <ReviewsNRating
          count={[1407, 23123]}
          label={['reviews', 'happy customers']}
          reviews={[]}
        />

        <FadeCarousel dots={true} autoplay={false}>
          {TEST_RATING_DATA.map((rating, index) => (
            <div key={'unique_rating_' + index}>
              <RatingFeed
                RatingObject={rating}
                rateSize={40}
                fontStyle={{
                  fontSize: '1.5em',
                }}
              />
            </div>
          ))}
        </FadeCarousel>
      </div>
      <div className="taupe-dark p-3">
        <p className="text-2xl mb-2">Shop by collections</p>
        <p className="text-3xl mb-2">Collection Name</p>
        <HorizontalCarousel slides_to_show={[4, 3, 1]} arrows={false}>
          {TEST_COLLECTIONS.map((item, index) => (
            <CollectionItem collection={item} index={index} />
          ))}
        </HorizontalCarousel>
        {/* <CollectionsGrid collections={TEST_COLLECTIONS}/> */}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products m-5">
      <p className="text-4xl">Recommended Products</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image data={product.images.nodes[0]} aspectRatio="1/1" />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-lg">{product.title}</p>
                    <p className="text-sm text-extralight">
                      <Money
                        data={product.priceRange.minVariantPrice}
                        className="text-extralight"
                      />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

function ReviewsNRating({count, label, reviews}) {
  return (
    <div className="text-center flex row_to_col justify-center items-center text-transparent bg-clip-text bg-gradient-to-b from-indigo-700 to-indigo-950 mb-15">
      <div className="flex flex-col justify-center items-center mx-20 my-10">
        <p className="text-16xl">{count[0]}</p>
        <p className="text-xl">{label[0]} </p>
      </div>
      <div
        title=""
        className="flex flex-col justify-center items-center mx-20 my-10"
      >
        <p className="text-16xl">{count[1]}</p>
        <p className="text-xl">{label[1]}</p>
      </div>
    </div>
  );
}

export function links() {
  return [...FadeCss(), ...HorizontalCss()];
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
