import React from "react";
import { ArrowRight, PlusSquare, Search, Users, RefreshCcw } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="relative w-full md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden  min-h-[80vh]">

        <div className="lg:col-span-4 pr-10 md:py-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200 relative">
          <div>
            <div className="flex items-center gap-2 mb-8 mt-2">
              <div className="flex items-center gap-3 text-orange-600 text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Simple Process
              </div>
              <div className="w-32 h-px bg-orange-500"> </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tighter mb-8">
              How <br />
              <span className="text-orange-500">BookSwap</span>
              <br />
              Works
            </h2>

            <p className="text-neutral-600 text-lg leading-relaxed max-w-sm border-l-2 border-orange-200 pl-6">
              Join our community and give your old books a new life in 3 simple
              steps. Efficient, eco-friendly, and free.
            </p>
          </div>

          <button className="group flex items-center gap-3 text-lg font-bold text-neutral-900 hover:text-orange-500 transition-colors">
            Start Swapping
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="lg:col-span-8 grid grid-rows-[auto_1fr]">

          <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-10 border-b border-neutral-200 relative group">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-black ">
              1
            </div>

            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">List Your Book</h3>
              <p className="text-neutral-600 text-lg font-medium max-w-lg">
                Snap a photo, add the title, and set your preferences. It takes
                less than a minute to create a beautiful listing.
              </p>
            </div>

            <div className="hidden md:flex w-24 h-24 rounded-full bg-neutral-100 border border-neutral-200 items-center justify-center">
              <PlusSquare size={36} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="p-10 md:p-14 bg-orange-400 relative overflow-hidden">
              <div className="flex justify-between mb-8">
                <span className="text-6xl font-black text-black/20">2</span>
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                  <Search />
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-3 text-[#211a11]">
                Find a Reader
              </h4>
              <p className="text-[#211a11]/80 font-semibold">
                Our smart algorithm matches your book with eager readers
                instantly.
              </p>

              <Users
                size={140}
                className="absolute -top-10 -right-10 opacity-10"
              />
            </div>

            <div className="p-10 md:p-14 bg-neutral-900 relative overflow-hidden">
              <div className="flex justify-between mb-8">
                <span className="text-6xl font-black text-white/10">3</span>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <RefreshCcw className="text-orange-500 animate-pulse" />
                </div>
              </div>

              <h4 className="text-2xl font-bold text-white mb-3">
                Exchange & Read
              </h4>
              <p className="text-neutral-400 font-medium">
                Arrange a safe meetup or mail delivery. Enjoy your new read!
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
