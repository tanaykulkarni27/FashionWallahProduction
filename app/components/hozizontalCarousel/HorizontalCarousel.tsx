// HorizontalCarousel.js
import React from 'react';
import Slider from 'react-slick';
import slickcss from 'slick-carousel/slick/slick.css';
import slickTheme from 'slick-carousel/slick/slick-theme.css';
import localHorizontalCarousel from './horizontalCarousel.css';
// import {Video} from '@shopify/hydrogen';

export type HorizontalCarouselProps = {
  children: React.ReactNode;
  arrows:boolean;
  dots: boolean;
  slides_to_show: number[];
};

type SlideArrowProps = {
  onClick: () => void;
};


const HorizontalCarousel = ({
  children,
  arrows = true,
  dots = false,
  slides_to_show,
}:
HorizontalCarouselProps) => {
  const settings = {
    prevArrow: <PrevSlide />,
    nextArrow: <NextSlide/>,
    infinite: true,
    speed: 300,
    arrows,
    dots,
    slidesToShow: 4, // Set the number of items to show at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Adjust breakpoints as needed
        settings: {
          slidesToShow: slides_to_show[0],
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slides_to_show[1],
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slides_to_show[2],
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <div>
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

const NextSlide = ({onClick=()=>{}}:SlideArrowProps):React.JSX.Element => (
  <button
    onClick={onClick}
    className="slick-arrow-next rounded-full bg-white p-1"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M4 11H16.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />
    </svg>
  </button>
);

const PrevSlide = ({onClick=()=>{}}:SlideArrowProps):React.JSX.Element => (
  <button onClick={onClick} className="slick-arrow-prev rounded-full bg-white">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
    </svg>
  </button>
);

export function links() {
  return [
    {rel: 'stylesheet', href: slickcss},
    {rel: 'stylesheet', href: slickTheme},
    {rel: 'stylesheet', href: localHorizontalCarousel},
  ];
}

export default HorizontalCarousel;
