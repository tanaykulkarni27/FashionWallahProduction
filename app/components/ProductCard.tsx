import clsx from 'clsx';
import type {ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';
import { IoAdd } from "react-icons/io5";
import type {ProductCardFragment} from 'storefrontapi.generated';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import { useEffect, useState } from 'react';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
}) {
  let cardLabel = 'Upto 30% off';

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  var {image, price, compareAtPrice} = firstVariant;
var comparisonPrice = null;
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }
  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className="flex flex-col gap-2" style={{zIndex: 0}}>
      
        <div className={clsx('grid gap-4', className)}>
          <div className="relative ">
          <Link
            onClick={onClick}
            to={`/products/${product.handle}`}
            prefetch="intent"
          >
            {image && (
              <Image
                className="object-cover fadeIn w-full"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 35vw"
                aspectRatio="1/1"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            <Text
              as="label"
              size="fine"
              className={`absolute top-0 left-0 text-right p-1 offer_red text-white ${cardLabel === '' || !cardLabel ? 'hidden':''}`}
            >
              {'Upto 30% off'}
              {/* {cardLabel} */}
               {/* {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                  <CompareAtPrice
                    className="font-extralight opacity-50 playfair-display bg-red-500 ml-2"
                    data={compareAtPrice as MoneyV2}
                  />
                )} */}
            </Text>
          </Link>
            {/* QUICK ADD TO CART */}
            <AddToCartButton width='auto'
              className='bg-contrast absolute bottom-0 right-0 m-4 flex justify-center items-center'
              lines={[{
                    merchandiseId: firstVariant.id,
                    quantity: 1,
                  }]}
              data-test="add-to-cart"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}>
              <button>
                <IoAdd size={30} className='text-[#f5db8b] hover:rotate-180 transition duration-500' />
              </button>
            </AddToCartButton>
          </div>
          <Link
            onClick={onClick}
            to={`/products/${product.handle}`}
            prefetch="intent"
          >
          <div className="grid gap-1 flex flex-col justify-center items-center">
            <Text
              className="overflow-hidden text-sm text-center w-100 line-clamp-1 md:line-clamp-2 decoration-dashed animate-tracking-in-expand"
              as="h3"
            >
              {product.title.toUpperCase()}
            </Text>
            <div className="flex gap-4 flex-row justify-center items-center w-full">
              {/*  */}
              <Text className="flex gap-4 ">
                <Money
                  withoutTrailingZeros
                  data={price!}
                  className="font-extralight price_blue mr-1 p-1"
                  // style={{fontFamily: 'Playfair Display'}}
                />
                {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                  <CompareAtPrice
                    className="font-extralight opacity-100 p-1"
                    data={compareAtPrice as MoneyV2}
                  />
                )}
              </Text>
            </div>
          </div>
          </Link>
        </div>
      {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="bg-[#5d8bd7] text-white p-1 translate-y-1/2 rounded-l-md rounded-b-md text-sm z-40"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to cart
          </Text>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )}
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('line-through', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
