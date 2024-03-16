import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";

export default function FeaturedCollection({FeaturedCollection = Type_Of_Collections}:{FeaturedCollection:any}) {
    
    // WE NEED TO MAINTAIN THE INDEX SO THAT ONLY ONE COLLECTION IS SHOWN AT THE TIME
    const [active_collection, set_active_collection] = useState(0);
    
    // LEFT TO RIGHT ANIMATION CLASSES
    const left_to_right = ['-translate-x-full','translate-x-0','translate-x-0','translate-x-full'];
    // RIGHT TO LEFT ANIMATION
    const right_to_left = ['translate-x-full','translate-x-0','translate-x-0','-translate-x-full'];

    // WHAT IS CURRENT ANIMATION REQUIRED FOR THE TRANSITION
    // THIS IS REQUIRED SO THAT THE WE HAVE DIFFERENT TRANSITION FOR 
    // DIFFERENT BUTTON THAT IS LEFT TO RIGHT FOR NEXT BUTTON
    // RIGHT TO LEFT FOR PREVIOUS BUTTON
    const [current_anim,set_current_anim] = useState(left_to_right);

    /*
        THIS IS FUNCTION WHEN NEXT ARROW BUTTON IS CLICKED
        IT CHANGES THE ENTER AND LEAVE ANIMATION FOR THE TRANSITION OF COLLECTION TYPE
        AND THEN CHANGES THE INDEX OF THE COLLECTION ARRAY SO THAT THE COLLECTION TYPE AND 
        ITS RESPECTIVE PRODUCTS ARE CHANGED
    */
    const move_next = ()=>{
        set_current_anim(right_to_left);
        const nextIndex = (active_collection + 1) % FeaturedCollection.length;
        set_active_collection(nextIndex);
    }

    /*
        THIS IS FUNCTION WHEN PREVIOUS ARROW BUTTON IS CLICKED
        IT CHANGES THE ENTER AND LEAVE ANIMATION FOR THE TRANSITION OF COLLECTION TYPE
        AND THEN CHANGES THE INDEX OF THE COLLECTION ARRAY SO THAT THE COLLECTION TYPE AND 
        ITS RESPECTIVE PRODUCTS ARE CHANGED
    */
    const move_prev = ()=>{
        set_current_anim(left_to_right);
        const prevIndex = (active_collection - 1 + FeaturedCollection.length) % FeaturedCollection.length;
        set_active_collection(prevIndex);
    }

  return (
    // THIS THE ROOT DIVISION
    <div className='relative flex flex-row justify-center items-center w-full hiddenScroll'>
        {/* THIS IS PREVIOUS BUTTON */}
        <button onClick={move_prev} className={`${button_class} left-0`}><FaArrowLeft /></button>
        {/* THIS IS NEXT BUTTON */}
        <button onClick={move_next} className={`${button_class} right-0`}><FaArrowRight /></button>
        {
            FeaturedCollection.map((item,index)=><div key={index + "FEATURED"} className='w-full absolute top-0 left-0 z-0'>
                    {/*
                        TRANSITION FOR THE COLLECTION TYPE
                        THIS TRANSITION IS FOR COLLECTION TYPES
                    */}
                    <Transition
                        show={active_collection == index}
                        enter="transition-transform duration-1000"
                        enterFrom={current_anim[0]}
                        enterTo={current_anim[1]}
                        leave="transition-transform duration-1000"
                        leaveFrom={current_anim[2]}
                        leaveTo={current_anim[3]}
                        className={'w-full hiddenScroll'}
                    >
                    <div className='w-full text-center z-0 hiddenScroll text-2xl'>
                        {item.title}
                    </div>
                    </Transition>

                    {/* 
                        WHEN COLLECTION CHANGES
                        This transition is for the actual carousel containing the collection products
                     */}
                    <Transition
                        show={active_collection == index}
                        enter="transition-opacity duration-1000"
                        enterFrom={'opacity-0'}
                        enterTo={'opacity-100'}
                        leave="transition-opacity duration-0"
                        leaveFrom={'opacity-100'}
                        leaveTo={'opacity-0'}
                        className={'w-full z-0 hiddenScroll'}
                    >
                    {/* HERE GOES THE PRODUCT GRID FOR THE COLLECTION */}
                    <div className='w-full grid grid-cols-2 lg:grid-cols-3 items-center justify-center'>
                        {item.products.map((product)=><div key={product.id + 'prdct'}>{product.title}</div>)}
                    </div>
                    </Transition>
                </div>
        )} 
    </div>
  )
}

const button_class = 'absolute bottom-0 top-0 z-10 m-1 rounded-full shadow-lg bg-white'

const Type_Of_Collections = [
    {
        title:'NATURAL STONE BRACELET',
      products: [ 
        {
          id: '1',
          title: 'Gold Pendant Necklace',
          image: 'path/to/gold-pendant-necklace.jpg', // Replace with actual image path
          price: 49.99,
          currency: 'USD',
        },
        {
          id: '2',
          title: 'Silver Hoop Earrings',
          image: 'path/to/silver-hoop-earrings.jpg', 
          price: 24.95,
          currency: 'USD',
        }
      ]
    },
    {
        title:'A D BRACELETS',
      products: [ 
        {
          id: '3',
          title: 'Floral Maxi Dress',
          price: 79.99,
        },
        {
          id: '4',
          title: 'Little Black Dress',
          price: 59.95,
          currency: 'USD',
        }
        // Add more products
      ]
    },
    {
        title:'CHAIN PENDANTS',
        products: [ 
        {
          id: '5',
          title: 'Graphic Tee',
          price: 19.99,
          currency: 'USD',
        },
        {
          id: '6',
          title: 'Striped T-Shirt',
          image: 'path/to/striped-tee.jpg', // Replace with actual image path
          price: 14.95,
          currency: 'USD',
        }
      ]
    }
  ];