import {Link} from '@remix-run/react';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';

import {useVariantUrl} from '~/lib/variants';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {isDiscounted} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductItem({
  product,
  loading,
  className,
}: {
  product: ProductCardFragment;
  loading?: HTMLImageElement['loading'];
  className: string;
}) {
  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;
  const firstVariant = flattenConnection(cardProduct.variants)[0];
  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;
  return (
    <div className="flex flex-col gap-2 z-0">
      <Link
        className="product-item"
        key={product.id}
        prefetch="intent"
        to={`/products/${product.handle}`}
      >
        {image && (
          <div className={clsx('grid gap-4', className + ' z-0')}>
            <Image
              alt={image.altText || product.title}
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 35vw"
              aspectRatio="1/1"
              src={image.url}
              loading={loading}
              className="w-full z-0"
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center mt-6">
          <p className="text-sm text-center w-100 line-clamp-2 decoration-dashed">
            {product.title.toUpperCase()}
          </p>
          <p className="text-md text-extralight">
            <div className="flex flex-row justify-center items-center w-fit">
              <Money
                data={price}
                className="font-extralight bg-[#5d8bd7] mr-1"
              />

              {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                <CompareAtPrice
                  className="font-extralight opacity-50 playfair-display"
                  data={compareAtPrice as MoneyV2}
                />
              )}
            </div>
          </p>
        </div>
      </Link>
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

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
