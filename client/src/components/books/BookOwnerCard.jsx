import { Heart, MapPin, Star } from "lucide-react";
import { setbookfavorite } from "../../store/features/bookSlice";
import { useState } from 'react';

const BookOwnerCard = ({ id, book }) => {
  const { owner, location, status, availabilityType } = book;
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
            {owner.name[0]}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">
              {owner.name}
            </h4>

            <div className="flex items-center gap-1 text-sm">
              <Star size={14} fill="currentColor" className="text-yellow-500" />
              <span className="font-medium text-gray-800">
                {owner.ratingStats.avgRating}
              </span>
              <span className="text-gray-400 text-xs">
                ({owner.ratingStats.totalRatings} reviews)
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
          Available for lending
        </span>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-sm">
        <Row label="Sharing mode" value={availabilityType} />
        <Row
          label="Available from"
          value={`${location.city}, ${location.state}`}
          icon={<MapPin size={14} />}
        />
      </div>

      <div className="w-full h-[4rem] ">
        <textarea
          className="w-full h-full bg-gray-200 rounded-lg p-2 resize-none border-0 border-black"
          placeholder="(Optional) You can add a message."
          title="You can send some message to Book Owner."
          name="message"
          id="userMessage" />
      </div>

      <div className="space-y-3">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition">
          Request this book
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className="w-full border border-gray-600 py-3 rounded-full flex items-center justify-center gap-2 font-medium text-gray-700 hover:bg-gray-50 transition">
          <Heart size={16} fill={saved ? '#ed4956' : 'none'} stroke="#ed4956" />
          {saved ? "Saved for later" : "Save for later"}
        </button>
      </div>
    </div>
  );
};

const Row = ({ label, value, icon }) => (
  <div className="flex justify-between items-center text-gray-600">
    <span className="text-gray-500">{label}</span>
    <span className="flex items-center gap-1 font-semibold text-gray-900">
      {value} {icon}
    </span>
  </div>
);

export default BookOwnerCard;
