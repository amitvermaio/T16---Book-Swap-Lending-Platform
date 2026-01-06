import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, User, ArrowUpRight } from 'lucide-react';
import { getAvailabilityBadge } from '../utils/constants';

const BookCard = ({
  _id,
  coverImageUrl,
  title,
  author,
  owner,
  genre = [],
  location,
  availabilityType,
  tags = [],
  status = 'available'
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const availabilityTypes = Array.isArray(availabilityType) ? availabilityType : [availabilityType];

  const locationText = location ? `${location.city}, ${location.state}` : 'Unknown Location';
  const primaryGenre = genre.length > 0 ? genre[0] : 'General';
  const ownerName = owner?.name || 'Unknown Owner';

  const handleViewDetails = () => {
    navigate(`/books/${_id}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="w-[17.37rem] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full cursor-pointer"
    >
      {/* --- Image Section --- */}
      <div className="relative h-64 bg-gray-100 overflow-hidden shrink-0">
        <img
          src={coverImageUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2730"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-orange-600 hover:text-white"
          >
            View Details
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all duration-200 group/heart z-20"
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${isFavorite
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400 group-hover/heart:text-red-500'
              }`}
          />
        </button>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5 text-gray-700 bg-white/90 backdrop-blur-md z-20">
            <span className="text-xs font-bold uppercase tracking-wide">
              {tags[0]}
            </span>
          </div>
        )}

        {/* Availability Badges */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%] z-20">
          {availabilityTypes.map((type, index) => {
            const info = getAvailabilityBadge(type);
            if (!info) return null;
            return (
              <div
                key={index}
                className={`px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-md bg-opacity-95 ${info.color}`}
              >
                <info.icon size={10} className="text-white" />
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                  {info.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="p-4 flex flex-col gap-1 flex-grow">

        <span className="text-orange-500 text-[10px] font-bold uppercase tracking-wider">
          {primaryGenre}
        </span>
        <h3 className="text-gray-900 font-semibold text-lg leading-tight truncate tracking-tighter" title={title}>
          {title}
        </h3>
        <p className="text-gray-500 text-sm truncate">
          by {author}
        </p>

        <div className="mt-1 flex flex-col gap-1 pt-3">
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={14} className="shrink-0" />
            <span className="text-xs font-medium truncate">{locationText}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500">
            <User size={14} className="shrink-0" />
            <span className="text-xs font-medium truncate">Owner: {ownerName}</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          {status !== 'available' ? (
            <button disabled className="w-full bg-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl cursor-not-allowed text-sm">
              Currently Unavailable
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100 text-white font-semibold py-2.5 rounded-xl transition-colors duration-200 text-sm"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;