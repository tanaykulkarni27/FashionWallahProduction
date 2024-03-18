import {Transition} from '@headlessui/react';
import {useState} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {Grid, ProductCard, ProductSwimlane} from '..';

export default function FeaturedCollection({FeaturedCollection}: {
  FeaturedCollection: any;
}) {
  // console.log(FeaturedCollection[0].products);

  // WE NEED TO MAINTAIN THE INDEX SO THAT ONLY ONE COLLECTION IS SHOWN AT THE TIME
  const [active_collection, set_active_collection] = useState(0);

  // LEFT TO RIGHT ANIMATION CLASSES
  const left_to_right = [
    '-translate-x-full',
    'translate-x-0',
    'translate-x-0',
    'translate-x-full',
  ];
  // RIGHT TO LEFT ANIMATION
  const right_to_left = [
    'translate-x-full',
    'translate-x-0',
    'translate-x-0',
    '-translate-x-full',
  ];

  // WHAT IS CURRENT ANIMATION REQUIRED FOR THE TRANSITION
  // THIS IS REQUIRED SO THAT THE WE HAVE DIFFERENT TRANSITION FOR
  // DIFFERENT BUTTON THAT IS LEFT TO RIGHT FOR NEXT BUTTON
  // RIGHT TO LEFT FOR PREVIOUS BUTTON
  const [current_anim, set_current_anim] = useState(left_to_right);

  /*
        THIS IS FUNCTION WHEN NEXT ARROW BUTTON IS CLICKED
        IT CHANGES THE ENTER AND LEAVE ANIMATION FOR THE TRANSITION OF COLLECTION TYPE
        AND THEN CHANGES THE INDEX OF THE COLLECTION ARRAY SO THAT THE COLLECTION TYPE AND 
        ITS RESPECTIVE PRODUCTS ARE CHANGED
    */
  const move_next = () => {
    set_current_anim(right_to_left);
    const nextIndex = (active_collection + 1) % FeaturedCollection.length;
    set_active_collection(nextIndex);
  };

  /*
        THIS IS FUNCTION WHEN PREVIOUS ARROW BUTTON IS CLICKED
        IT CHANGES THE ENTER AND LEAVE ANIMATION FOR THE TRANSITION OF COLLECTION TYPE
        AND THEN CHANGES THE INDEX OF THE COLLECTION ARRAY SO THAT THE COLLECTION TYPE AND 
        ITS RESPECTIVE PRODUCTS ARE CHANGED
    */
  const move_prev = () => {
    set_current_anim(left_to_right);
    const prevIndex =
      (active_collection - 1 + FeaturedCollection.length) %
      FeaturedCollection.length;
    set_active_collection(prevIndex);
  };

  return (
    // THIS THE ROOT DIVISION
    
    <div className="relative flex flex-col flex-grow w-full overflow-x-hidden">
        <div className='relative flex flex-col flex-grow  w-full overflow-x-hidden min-h-[10vh]'>
          <button className={button_class + ` left-0`} onClick={move_prev}><FaArrowLeft /></button>
          <button className={button_class + ` right-0`} onClick={move_next}><FaArrowRight /></button>
          {FeaturedCollection.map((item, index) => (
            <div
              key={index + 'FEATURED'}
              className="w-full z-0"
            >
              <Transition
                show={active_collection == index}
                enter="transition-transform duration-1000"
                enterFrom={current_anim[0]}
                enterTo={current_anim[1]}
                leave="transition-transform duration-1000"
                leaveFrom={current_anim[2]}
                leaveTo={current_anim[3]}
                className={'w-full'}
              >
                <div className="w-full absolute top-0 left-0 text-center z-0 text-xl m-4">
                  {item.title}
                </div>
              </Transition>
            </div>
            ))}
        </div>
        {FeaturedCollection.map((item, index) => (
          <div
            key={index + 'FEATURED'}
            className="w-full z-0"
          >

          <Transition
            show={active_collection == index}
            enter="transition-opacity duration-1000"
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave="transition-opacity duration-1000"
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
            className={'w-full z-0'}
          >
            <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12 z-0">
              {item.products.nodes.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  className="snap-start w-80 z-0"
                />
              ))}
            </div>
          </Transition>
        </div>
      ))}
    </div>
  );
}

const button_class =
  'absolute bottom-0 top-0 z-10 m-1 rounded-full shadow-lg bg-white';


  /*
  
  */