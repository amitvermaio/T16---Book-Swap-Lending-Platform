import { MapPin, Star, Heart, Repeat, BookOpen, Gift, Send, Calendar } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { asyncaddbooktofavorites } from '../../store/actions/booksAction';
import { asyncsendbookrequest } from '../../store/actions/requestActions';

const BookInfo = ({ book }) => {
  const {
    title,
    author,
    status,
    availabilityType = [],
    genre = [],
    owner,
    location,
    description
  } = book;

  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const getActionDetails = (type) => {
    switch (type.toLowerCase()) {
      case 'swap':
        return { label: 'Request Swap', icon: <Repeat className="w-5 h-5" /> };
      case 'borrow':
        return { label: 'Borrow Book', icon: <BookOpen className="w-5 h-5" /> };
      case 'donate':
        return { label: 'Claim Free', icon: <Gift className="w-5 h-5" /> };
      default:
        return { label: 'Request', icon: <Send className="w-5 h-5" /> };
    }
  };

  const AddToFavoritesHandler = () => {
    if (!user) return toast.error('Login to add to Favorites!');
    dispatch(asyncaddbooktofavorites(user._id, book._id));
  };

  const handleSendRequest = (actionType) => {
    if (!user) {
      toast.error('Please login to send a request!');
      return;
    }

    if (!note.trim()) {
      toast.error('Please write a note to the owner!');
      return;
    }

    const requestData = {
      bookId: book._id,
      type: actionType,
      offeredBookId: actionType.toLowerCase() === 'swap' ? null : null, 
      dueDate: dueDate, 
      notes: note
    };
    
    const res = dispatch(asyncsendbookrequest(requestData));
    if (res.success) {
      toast.success("Request Sent Successfully!");
      setNote(""); 
      setDueDate("");
    }
    
  };

  return (
    <div className="space-y-8 font-jakarta">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-100 rounded-full">
            {status}
          </span>
          {availabilityType.map((type, i) => (
            <span key={i} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-800 bg-orange-100 rounded-full">
              {type}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-600 font-medium">by {author}</p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="font-bold text-xs text-gray-400 uppercase tracking-widest mr-2">GENRE</span>
          {genre.map((g, index) => (
            <span key={index} className="px-4 py-1.5 text-sm border border-gray-200 bg-white rounded-full text-gray-700 shadow-sm">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Owner Profile Card */}
      <div className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-4">
            <img
              src={owner?.avatar || "https://ui-avatars.com/api/?name=" + owner?.name}
              alt={owner?.name}
              className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {owner?.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mt-0.5">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold text-black mr-1">
                  {owner?.ratingStats?.avgRating || "New"}
                </span>
                <span className="text-gray-400">
                  ({owner?.ratingStats?.totalRatings || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 pl-1">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {location?.city}, {location?.state}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Section: Date Picker + Textarea */}
      <div className="space-y-4">
        {/* Date Picker */}
        <div className="space-y-2">
           <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1 flex items-center gap-2">
             <Calendar className="w-4 h-4" />
             Proposed Due Date
           </label>
           <input 
             type="date"
             value={dueDate}
             min={new Date().toISOString().split("T")[0]} // Prevent past dates
             onChange={(e) => setDueDate(e.target.value)}
             className="w-full sm:w-1/2 p-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors bg-gray-50 focus:bg-white text-gray-700"
           />
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
              Message to Owner
           </label>
           <textarea
              maxLength={250}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Hi ${owner?.name}, I would like to...`}
              className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none focus:ring-0 resize-none transition-colors bg-gray-50 focus:bg-white text-gray-700 placeholder-gray-400 min-h-[120px]"
           />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-3 pt-2">
        {availabilityType.map((type) => {
          const { label, icon } = getActionDetails(type);
          return (
            <button
              key={type}
              onClick={() => handleSendRequest(type)}
              className="flex-1 min-w-[160px] bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              {icon}
              {label}
            </button>
          );
        })}

        <button
          onClick={AddToFavoritesHandler}
          className="w-full sm:w-auto p-3.5 rounded-2xl border border-gray-200 hover:bg-red-50 hover:border-red-200 group transition-all flex items-center justify-center">
          <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Synopsis */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Synopsis</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BookInfo;