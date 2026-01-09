import { useState, useEffect } from 'react';
import { Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import Magnifier from '../ImageMagnifier';

const BookHero = ({ images }) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  // Find index for the counter (1 / 5)
  const currentIndex = images.indexOf(mainImage);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
  };

  return (
    <div className="flex flex-col gap-4 font-jakarta">
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded-3xl overflow-hidden group shadow-sm border border-gray-100">
        <div className="w-full h-full flex items-center justify-center p-4">
          <Magnifier
            src={mainImage} 
            alt="Book Image" 
            className="max-h-full max-w-full object-contain rounded-2xl"
          />
        </div>

        <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg z-10">
          <ImageIcon size={14} className="text-orange-500" />
          <span>
            {currentIndex + 1} <span className="text-gray-400">/</span> {images.length}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar px-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`
              relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300
              ${mainImage === img
                ? 'ring-2 ring-orange-500 ring-offset-2 opacity-100 scale-95'
                : 'opacity-60 hover:opacity-100 hover:scale-105 ring-1 ring-gray-200'}
            `}
          >
            <img
              src={img}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {mainImage === img && (
              <div className="absolute inset-0 bg-orange-500/10" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookHero;