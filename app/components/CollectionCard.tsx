import {useState} from 'react';
import {FaChevronCircleRight} from 'react-icons/fa';
import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

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

export default function CollectionCard({collection}:{collection:CollectionNode}) {
    // console.log(collection);
    return (
      <div className="relative m-5 group/item">
        <Link
          className="collection-item"
          key={collection.id}
          to={`/collections/${collection.handle}`}
          prefetch="intent"
        >
          {collection?.image && (
            <Image
              alt={collection.image.altText || collection.title || 'some thing'}
              aspectRatio="1/1"
              data={collection.image}
            />
          )}
          <div
            className="absolute m-3 bottom-0 left-0 flex flex-col justify-start"
          >
            <FaChevronCircleRight
              className='text-white hidden group-hover/item:block'
              style={{color:'white'}}
            />
            <h5 className="text-white text-xl">{collection.title}</h5>
          </div>
        </Link>
      </div>
    );
  }
  