import React from "react";
import HeroImage1 from "../../assets/hero-image-1.jpg";
import HeroImage2 from "../../assets/hero-image-2.jpg";
import HeroImage3 from "../../assets/hero-image-3.jpg";
import BookIcon from "../../assets/BookIcon.png"
import BookIconHeroLeft from "../../assets/BookIconHeroLeft.png"

const HeroSection = () => {
  return (
    <section className="w-full h-auto md:h-[calc(100vh-100px)] flex flex-col md:flex-row py-10 md:py-0">
      {/* Left Side (Text) */}
      <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center items-start pr-0 md:pr-30 mb-10 md:mb-0 relative">
        <div className="text-4xl roboto md:text-6xl font-semibold tracking-wide leading-tight md:leading-18">
          <h1>Find Books</h1>
          <h1>
            You'll <span className="text-orange-500">Love</span>
          </h1>
          <h1>Forever.</h1>
          <div className="absolute w-20 top-10 right-10 md:right-40 md:top-[40%]">
            <img src={BookIconHeroLeft} alt="" />
          </div>
        </div>
        <p className="mt-4 text-base md:text-lg text-gray-600">
          Find rare books, swap unique copies, and explore hidden titles shared
          by real readers. Your next unforgettable reading journey begins here.
        </p>
        <button className="px-8 py-3 text-sm tracking-tight rounded-full bg-orange-400 hover:bg-orange-500 text-white mt-6 shadow-lg hover:shadow-xl transition-all">
          Explore Now
        </button>
      </div>

      {/* Right Side (Image Grid) */}
      <div className="w-full md:w-1/2 h-[500px] md:h-full mt-0 md:mt-6 grid grid-rows-8 grid-cols-2 gap-4 md:gap-15">
        
        {/* ================= LEFT HALF ================= */}
        <div className="col-span-1 row-span-7 md:row-span-8 relative">
          <div className="absolute inset-x-0 top-[0%] bottom-[0%] md:top-[14.285%] md:bottom-[14.285%] bg-blue-500 rounded-xl object-cover overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={HeroImage1}
              alt="Books-1"
            />
          </div>
          <div className="hidden md:block absolute w-30 -bottom-10 -left-10">
            <img src={BookIcon} alt="" />
          </div>
        </div>

        {/* ================= RIGHT HALF ================= */}
        <div className="col-span-1 row-span-7 md:row-span-8 grid md:grid-rows-8 gap-4 md:gap-1">
          {/* Top Image */}
          <div className="row-span-4 bg-green-500 object-cover overflow-hidden rounded-xl shadow-md">
            <img
              className="w-full h-full object-cover"
              src={HeroImage2}
              alt="Book-2"
            />
          </div>

          <div className="hidden md:block md:row-span-1"></div>

          {/* Bottom Image */}
          <div className="row-span-3 bg-yellow-500 object-cover overflow-hidden object-bottom rounded-xl shadow-md">
            <img 
              className="w-full h-full object-cover"
              src={HeroImage3} 
              alt="Book-3" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;