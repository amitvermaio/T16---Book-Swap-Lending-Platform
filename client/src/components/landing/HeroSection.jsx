import { Book } from 'lucide-react';

import HeroImage1 from "../../assets/hero-image-1.jpg";
import HeroImage2 from "../../assets/hero-image-2.jpg";
import HeroImage3 from "../../assets/hero-image-3.jpg";

const HeroSection = () => {
  return (
    <section className="bg-primary-color w-full py-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 px-6">

        {/* LEFT TEXT BLOCK */}
        <div className="flex-1 text-center lg:text-left">
          <h1
            className="
              font-poppins
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              text-black leading-snug
            "
          >
            Discover the
            <br className="hidden sm:block" />
            World’s{" "}
            <span className="text-[#eb8b66]">Hidden</span> Wonders
          </h1>

          <p
            className="
              mt-4 font-poppins
              text-black/70
              text-sm sm:text-base md:text-lg
              mx-auto lg:mx-0
              max-w-xl
            "
          >
            Find rare books, swap unique copies, and explore hidden titles
            shared by real readers. Your next unforgettable reading journey  
            begins here.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <button
              className="
                bg-[#ff9f6c] hover:bg-[#ff8c54]
                text-white
                font-semibold
                rounded-full
                px-10 py-3
                text-sm shadow-md transition
              "
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex-1 w-full">

          {/* MOBILE STACKED IMAGES */}
          <div className="flex flex-col gap-4 w-full sm:hidden">

            {/* big top image */}
            <img
              src={HeroImage1}
              alt="Hero"
              className="w-full h-48 rounded-2xl object-cover"
            />

            {/* 2 small images */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src={HeroImage2}
                alt="Hero"
                className="h-32 w-full rounded-2xl object-cover"
              />

              <img
                src={HeroImage3}
                alt="Hero"
                className="h-32 w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* DESKTOP IMAGE GRID */}
          <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-6 lg:justify-end justify-center">

            {/* big */}
            <img
              src={HeroImage1}
              alt="Hero"
              className="
                col-span-2
                w-64 sm:w-72 md:w-80
                h-56 sm:h-64 md:h-72
                rounded-2xl object-cover
              "
            />
            <img
              src={HeroImage2}
              alt="Hero"
              className="
                w-32 sm:w-36 md:w-40
                h-32 sm:h-36 md:h-40
                rounded-2xl object-cover
              "
            />

            <img
              src={HeroImage3}
              alt="Hero"
              className="
                w-32 sm:w-36 md:w-40
                h-32 sm:h-36 md:h-40
                rounded-2xl object-cover
              "
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
