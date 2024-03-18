import {useState} from 'react';
import {FaChevronCircleRight} from 'react-icons/fa';
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
  className,
}: {
  collection: CollectionNode;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-2 z-0 group/item">
      <Link
        className="collection-item"
        key={collection.id}
        prefetch="intent"
        to={`/collections/${collection.handle}`}
      >
        {collection.image && (
          <div className={clsx('grid gap-4 relative', className + ' z-0')}>
            <Image
              alt={collection.image.altText || collection.title}
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 35vw"
              aspectRatio="1/1"
              src={collection.image.url}
              className="w-full z-0 min-w-[30vw]"
            />
            <div className="flex flex-col justify-start items-start absolute bottom-0 left-0 z-40 m-3">
              <FaChevronCircleRight className='text-white hidden group-hover/item:block' />
              <p className="text-sm text-center w-100 line-clamp-2 decoration-dashed">
                {collection.title.toUpperCase()}
              </p>
            </div>
          </div>
        )}
        
      </Link>
    </div>
  );
}
