import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, RefreshCcw, HandHeart, Banknote, BookOpen } from 'lucide-react';
import { getAvailabilityBadge } from '../utils/constants';

const BookCard = ({ 
  _id,
  coverImageUrl, 
  title, 
  author, 
  genre = [],        
  location,          
  availabilityType,  
  tags = [],         
  status = 'available' 
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const availabilityInfo = getAvailabilityBadge(availabilityType);

  const locationText = location ? `${location.city}, ${location.state}` : 'Unknown Location';

  const primaryGenre = genre.length > 0 ? genre[0] : 'General';

  return (
    <div className="w-[17.37rem]  bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <div className="relative h-64 bg-gray-100 overflow-hidden shrink-0">
        <img 
          src={coverImageUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2730"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all duration-200 group/heart z-10"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400 group-hover/heart:text-red-500'
            }`} 
          />
        </button>

        {/* Top Right Tag (Using first tag from schema if available) */}
        {tags.length > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5 text-gray-700 bg-white/90 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-wide">
              {tags[0]}
            </span>
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md backdrop-blur-md bg-opacity-95 ${availabilityInfo.color}`}>
           <availabilityInfo.icon size={12} className="text-white" />
           <span className="text-[10px] font-bold text-white uppercase tracking-wider">
             {availabilityInfo.text}
           </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col gap-1 flex-grow">
        
        {/* Category */}
        <span className="text-orange-500 text-[10px] font-bold uppercase tracking-wider">
          {primaryGenre}
        </span>

        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-lg leading-tight truncate tracking-tighter" title={title}>
          {title}
        </h3>

        {/* Author */}
        <p className="text-gray-500 text-sm truncate">
          by {author}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2 mb-4 text-gray-400">
          <MapPin size={14} />
          <span className="text-xs font-medium truncate">{locationText}</span>
        </div>

        {/* --- Action Button (Dynamic based on availability) --- */}
        <div className="mt-auto">
          {status !== 'available' ? (
             <button disabled className="w-full bg-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl cursor-not-allowed">
               Currently Unavailable
             </button>
          ) : (
            <button onClick={() => navigate(`/books/${_id}`)} className={`w-full text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 shadow-lg ${
              availabilityType === 'donate' 
                ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-100' 
                : 'bg-orange-500 hover:bg-orange-600 shadow-orange-100'
            }`}>
              {availabilityType === 'swap' ? 'Request Swap' : availabilityType === 'donate' ? 'Claim Book' : 'Request to Borrow'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookCard;