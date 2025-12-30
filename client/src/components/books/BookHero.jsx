import { useState, useEffect } from 'react';

const BookHero = ({ images }) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center shadow-xl">
        <img
          src={mainImage}
          alt="Book Cover"
          className="h-full w-full object-contain drop-shadow-2xl transition-all duration-300"
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              mainImage === img 
                ? 'border-orange-500 shadow-md scale-105' 
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookHero;