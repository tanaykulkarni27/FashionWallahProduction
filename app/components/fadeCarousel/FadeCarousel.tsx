import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import slick from 'slick-carousel/slick/slick.css';
import slick_theme from 'slick-carousel/slick/slick-theme.css';

import FadeCarouselCss from './FadeCarousel.css';

export type FadeCarouselProps = {
  children: React.ReactNode;
  dots: boolean;
  autoplay: boolean;
};

export default function FadeCarousel({
  children,
  dots = false,
  autoplay = true,
}: FadeCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index

  // Define settings for the carousel
  const settings = {
    arrows: false,
    fade: true,
    dots,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed: 2000,
    appendDots: (dots: React.ReactElement) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="custom_dot">
        <div className="loading" />
      </div>
    ),
    afterChange: (currentIndex: number) => setCurrentSlide(currentIndex), // Update state on slide change
  };

  useEffect(() => {
    const intervalId = setInterval(() => {}, 3000); // Adjust interval as needed

    return () => clearInterval(intervalId); // Clear timer/animation on component unmount
  }, []);

  return (
    <div className="carousel-container m-0 p-0 h-fit" style={{zIndex: 2}}>
      <Slider className="m-0 p-0" {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export function links() {
  return [
    {rel: 'stylesheet', href: slick},
    {rel: 'stylesheet', href: slick_theme},
    {rel: 'stylesheet', href: FadeCarouselCss},
  ];
}
