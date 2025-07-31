
import React, { useState, useEffect } from 'react';
import image2 from '../assets/image2.jpg';
import image1 from '../assets/image1.jpg';
import image4 from '../assets/image4.jpg';
const banners = [
  {
    image: image1,
    alt: 'Bakery Specials Banner 1',
  
    link: '/bakery-specials', // Change this to your actual link
  },
  {
    image: image2,
    alt: 'Bakery Specials Banner 2',
 
    link: '/fresh-baked-goods', // Change this to your actual link
  },
  {
    image: image4,
    alt: 'Bakery Specials Banner 3',
    
    link: '/special-desserts', // Change this to your actual link
  },
];
const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrent((prev) => (prev + 1) % banners.length);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered]);
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };
  return (
    <div className="relative min-w-fit flex flex-col items-center my-1">
      <img
        src={banners[current].image}
        alt={banners[current].alt}
        className="w-full sm:h-72 object-cover rounded-lg shadow transition-all duration-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {/* Navigation Arrows */}
    
     
      {/* Description and Learn More Button */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{banners[current].description}</p>
        <a
          href={banners[current].link}
          className="mt-2 inline-block px-4 py-2 bg-yellow-300 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-100"
        >
         shop now
        </a>
      </div>
      {/* Indicator Dots */}
      <div className="flex gap-2 mt-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`block w-2 h-2 rounded-full ${
              idx === current ? 'bg-yellow-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default Banner;