import React from "react";
import HeroImage1 from "../../assets/hero-image-1.jpg";
import HeroImage2 from "../../assets/hero-image-2.jpg";
import HeroImage3 from "../../assets/hero-image-3.jpg";
import BookIcon from "../../assets/BookIcon.png";
import BookIconHeroLeft from "../../assets/BookIconHeroLeft.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="w-full h-auto md:h-[calc(100vh-100px)] flex flex-col md:flex-row py-10 md:py-0">

      {/* ================= LEFT SIDE ================= */}
      <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center items-start mb-10 md:mb-0 relative">
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tighter mb-6">
          Find Books <br />
          You&apos;ll{" "}
          <span className="text-orange-500">Love</span>
          <br />
          Forever.
        </h1>

        {/* Description */}
        <p className="text-neutral-600 text-lg leading-relaxed max-w-md border-l-2 border-orange-200 pl-6">
          Find rare books, swap unique copies, and explore hidden titles shared
          by real readers. Your next unforgettable reading journey begins here.
        </p>

        {/* CTA */}
        <button onClick={() => navigate('/books')} className="mt-8 px-8 py-3 text-sm font-bold tracking-wide rounded-full bg-orange-400 hover:bg-orange-500 text-white shadow-lg hover:shadow-xl transition-all">
          Explore Now
        </button>

        <div className="absolute w-20 top-12 right-2 md:right-30 md:top-[35%]">
          <img src={BookIconHeroLeft} alt="" />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full md:w-1/2 h-[500px] md:h-full mt-0 md:mt-6 grid grid-rows-8 grid-cols-2 gap-4 md:gap-6">

        {/* LEFT IMAGE */}
        <div className="col-span-1 row-span-7 md:row-span-8 relative">
          <div className="absolute inset-x-0 top-[0%] bottom-[0%] md:top-[14.285%] md:bottom-[14.285%] rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={HeroImage1}
              alt="Books-1"
            />
          </div>
          <div className="hidden md:block absolute w-28 -bottom-10 -left-10">
            <img src={BookIcon} alt="" />
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="col-span-1 row-span-7 md:row-span-8 grid md:grid-rows-8 gap-4 md:gap-1">

          <div className="row-span-4 rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={HeroImage2}
              alt="Book-2"
            />
          </div>

          <div className="hidden md:block md:row-span-1"></div>

          <div className="row-span-3 rounded-xl overflow-hidden shadow-md">
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
