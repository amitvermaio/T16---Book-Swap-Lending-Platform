import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
          <BookOpen size={14} />
          <span>Our Story</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Don't let your books <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            gather dust.
          </span>
        </h1>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          ReaderHaven is a community-driven platform designed to liberate books from shelves and put them into the hands of readers. We make reading accessible, sustainable, and social.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;