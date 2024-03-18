import { useState } from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';
import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import clsx from 'clsx';

interface CustomImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  image: CustomImage;
}

export default function CollectionCard({
  collection,
  key
}: {
  collection: CollectionNode;
  className: string;
  key:String;
}) {
  return (
  <Link
        className="sm:w-[35vw] lg:w-[25vw] md:w-[30vw] z-0 group/item"
        key={collection.id}
        prefetch="intent"
        to={`/collections/${collection.handle}`}
      >
        {collection.image && (
          <div className={'relative product-item'}>
              <Image
                alt={collection.image.altText || collection.title}
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 35vw"
                aspectRatio="1/1"
                data={collection.image}
                className="object-cover fadeIn w-full"
              />
              <div className="flex flex-col justify-start items-start absolute bottom-0 left-0 z-40 m-3">
                <FaChevronCircleRight className="text-white hidden group-hover/item:block" />
                <p className="text-sm text-center w-full line-clamp-2 decoration-dashed uppercase">
                  {collection.title}
                </p>
              </div>
            {/* </div> */}
          </div>
        )}
      </Link>
  );
}
