import { useEffect, useState } from 'react';
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

  const [isTextLoaded, setIsTextLoaded] = useState(false);

  useEffect(() => {
    setIsTextLoaded(true);
  }, []);

  return (
  <Link
        className="w-[73vw] md:w-[35vw] lg:w-[28vw] z-0 flex flex-col gap-2 group/item"
        key={collection.id}
        prefetch="intent"
        to={`/collections/${collection.handle}`}
      >
        {collection.image && (
          <div className={'relative product-item'}>
              <Image
                alt={collection.image.altText || collection.title}
                aspectRatio="1/1"
                data={collection.image}
                className="object-cover fadeIn w-full"
                width={collection.image.width}
                height={collection.image.height}
              />
              <div className="flex flex-col justify-start items-start absolute bottom-0 left-0 z-40 m-3">
                <FaChevronCircleRight className="text-white hidden group-hover/item:block" />
                <p className={`text-sm text-center w-full line-clamp-2 decoration-dashed uppercase ${isTextLoaded&&'animate-tracking-in-expand'}`}>
                  {collection.title}
                </p>
              </div>
          </div>
        )}
      </Link>
  );
}
