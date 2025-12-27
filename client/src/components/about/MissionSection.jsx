import React from 'react';
import { Leaf, Users, Globe2, HeartHandshake } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
      <Icon className="text-orange-500" size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const MissionSection = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Sustainability */}
        <ValueCard 
          icon={Leaf}
          title="Sustainable Reading"
          description="Every book swapped is one less book printed. We extend the lifecycle of physical books, reducing waste and our carbon footprint."
        />

        {/* Card 2: Accessibility */}
        <ValueCard 
          icon={Globe2}
          title="Access for Everyone"
          description="Books should not be a luxury. By lending and swapping, we ensure knowledge and stories are accessible to everyone, regardless of budget."
        />

        {/* Card 3: Community */}
        <ValueCard 
          icon={Users}
          title="Community First"
          description="We are more than a platform; we are a neighborhood. Connect with local readers, discuss plots, and build genuine connections."
        />

      </div>
    </section>
  );
};

export default MissionSection;