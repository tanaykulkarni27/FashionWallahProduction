import type {ProductCardFragment} from 'storefrontapi.generated';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';

export default function ShortProduct({product}:{product:ProductCardFragment;}) {

  return (
    <div className="border p-2 flex flex-row justify-center items-center w-full">
        <div className="mx-2 w-1/3">
            <Image 
                data={product.selectedVariant.image}
                alt={product.selectedVariant.image.altText || product.title}
                aspectRatio="1/1"
            />
        </div>
        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col justify-left items-start font-base w-3/4">
                <div className="font-bold line-clamp-1">{product.title} </div>
                <div className="font-extralight">
                    <Money data={product.selectedVariant.price} />
                </div>
            </div>
            <div className='h-fit'>
                <button className="rounded-lg bg-black/10 p-1 m-1">Add +</button>
            </div>
        </div>
    </div>
  ) 
}
