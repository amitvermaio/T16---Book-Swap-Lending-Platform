import React from 'react';
import { Search, Repeat, MessageCircle } from 'lucide-react';

const Step = ({ number, title, desc, icon: Icon }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 relative z-10">
      <Icon size={28} />
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold border-4 border-white">
        {number}
      </div>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 max-w-xs">{desc}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How ReaderHaven Works</h2>
          <p className="text-gray-500 mt-2">Join the revolution in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-0"></div>

          <Step 
            number="1" 
            title="List Your Library" 
            desc="Scan or enter details of books you're willing to lend or swap. Build your digital shelf in seconds."
            icon={Search}
          />
          <Step 
            number="2" 
            title="Connect & Request" 
            desc="Search for books nearby. Send a request to borrow or propose a swap with the owner."
            icon={MessageCircle}
          />
          <Step 
            number="3" 
            title="Exchange & Enjoy" 
            desc="Meet up or ship the book. Read, enjoy, and return it to keep the cycle going."
            icon={Repeat}
          />
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;