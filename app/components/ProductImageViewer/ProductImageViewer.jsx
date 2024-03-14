import Slider from 'react-slick';
import slick from 'slick-carousel/slick/slick.css';
import slick_theme from 'slick-carousel/slick/slick-theme.css';
import {useState} from 'react';
import Product_css from './Product.css'; // Import your custom CSS file

export default function ProductImageViewer({images}) {
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image
  // console.log(images)
  const handleImageClick = (image) => {
    setSelectedImage(image); // Update selected image on click
  };

  return (
    <div className="w-full p-3 flex flex-row justify-between">
      <div className="flex flex-col justify-start items-center w-2/12">
        {images.map((image, index) => (
          <div
            key={image.image.id}
            className="p-1 mt-3 mr-1"
            style={index == selectedImage ? selected_image_style : {}}
            onClick={() => {
              setSelectedImage(index);
            }}
          >
            <img
              src={image.image.url}
              onClick={() => {
                setSelectedImage(index);
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-10/12 pt-4">
        <img src={images[selectedImage].image.url} />
      </div>
    </div>
  );
}

const selected_image_style = {
  borderBottom: '2px solid #fff',
};

export function links() {
  return [
    {rel: 'stylesheet', href: Product_css},
    // {rel: 'stylesheet', href: slick},
    // {rel: 'stylesheet', href: slick_theme},
  ];
}
