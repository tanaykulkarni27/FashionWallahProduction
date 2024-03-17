import { useState, ReactNode, useEffect } from 'react';
import { Transition } from '@headlessui/react';
interface BannerData {
  image: {
    id: string;
    url: string;
    altText: string | null;
    width: string;
  };
  color: string;
  class: string;
}
type CarouselProps = {
  Banner_Data: BannerData[];
};

export default function BannerCarousel({ Banner_Data }: CarouselProps) {
  const [activeIndex,setActiveIndex] = useState(0);
  const go_at = (index:number)=>{
    setActiveIndex(()=>index);
  }

  return (
    <div className={`relative w-full h-screen ${Banner_Data[activeIndex].class}`}>
      {Banner_Data.map((item,index)=>{
        return <Transition
        show={index === activeIndex}
        key={item.image.id}
        as="div"
        className="absolute w-full h-[90vh] top-0 right-0"
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-0"
        leaveTo="opacity-0"
      >
        <div className={'m-0 w-full h-full flex flex-row justify-center items-center ' + item.class}>
          <div className='relative'>
            <img
              src={item.image.url}
              className="rounded-2xl w-[90vw] h-[90vh]"
            />
            <div className='flex flex-row justify-center items-center absolute bottom-[10px] right-[10px]'>
              {
                Banner_Data.map((item,index)=>(<div 
                  onClick={()=>go_at(index)}
                  className={`m-1 mb-0 ${index===activeIndex?'custom_dot_active':'custom_dot'}`}>
                  </div>))
              }
            </div>
          </div>
        </div>
    </Transition>
      })}
    </div> 
  );
}