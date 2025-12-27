import React from 'react';
import { ArrowRight } from 'lucide-react';

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1">{value}</div>
    <div className="text-orange-200 text-sm font-medium uppercase tracking-wider">{label}</div>
  </div>
);

const JoinCommunity = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-black rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to start your chapter?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of readers who are saving money, reducing waste, and building a global library together.
          </p>

          <div className="flex flex-wrap justify-center gap-12 mb-12 border-t border-white/10 pt-10">
            <Stat value="10k+" label="Active Readers" />
            <Stat value="50k+" label="Books Listed" />
            <Stat value="15k+" label="Successful Swaps" />
          </div>

          <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105">
            Join the Community <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;