import { MapPin, Star, Heart, Repeat, BookOpen, Gift, Send, Calendar, ChevronDown, CheckCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { asyncaddbooktofavorites } from '../../store/actions/booksAction';
import { asyncsendbookrequest } from '../../store/actions/requestActions';
import SwapBookModal from './SwapBookModal';

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
  const [selectedAction, setSelectedAction] = useState("");
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [offeredBook, setOfferedBook] = useState(null); 

  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const getActionDetails = (type) => {
    switch (type?.toLowerCase()) {
      case 'swap':
        return { label: 'Request Swap', icon: <Repeat className="w-5 h-5" /> };
      case 'borrow':
        return { label: 'Request to Borrow', icon: <BookOpen className="w-5 h-5" /> };
      case 'donate':
        return { label: 'Claim as Free', icon: <Gift className="w-5 h-5" /> };
      default:
        return { label: 'Send Request', icon: <Send className="w-5 h-5" /> };
    }
  };

  const AddToFavoritesHandler = () => {
    if (!user) return toast.error('Login to add to Favorites!');
    dispatch(asyncaddbooktofavorites(user._id, book._id));
  };

  const handleBookSelection = (selectedUserBook) => {
    setOfferedBook(selectedUserBook);
    setIsSwapModalOpen(false);
    toast.success(`${selectedUserBook.title} selected for swap!`);
  };

  const handleSendRequest = () => {
    if (!user) return toast.error('Please login to send a request!');
    if (!selectedAction) return toast.error('Please select an action type!');
    if (!note.trim()) return toast.error('Please write a note to the owner!');
    
    if (selectedAction.toLowerCase() === 'swap' && !offeredBook) {
      return toast.error('Please select a book from your collection to Swap!');
    }

    const requestData = {
      bookId: book._id,
      type: selectedAction,
      offeredBookId: selectedAction.toLowerCase() === 'swap' ? offeredBook._id : null,
      dueDate: dueDate,
      notes: note
    };

    dispatch(asyncsendbookrequest(requestData)).then(() => {
      setNote("");
      setDueDate("");
      setOfferedBook(null);
      setSelectedAction("");
    });
  };

  const { label, icon } = getActionDetails(selectedAction);

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

      <div className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-4">
            <img
              src={owner?.avatar?.url || owner?.avatar || `https://ui-avatars.com/api/?name=${owner?.name}`}
              alt={owner?.name}
              className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900">{owner?.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-0.5">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold text-black mr-1">{owner?.ratingStats?.avgRating || "New"}</span>
                <span className="text-gray-400">({owner?.ratingStats?.totalRatings || 0} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 pl-1">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{location?.city}, {location?.state}</span>
          </div>
        </div>
      </div>

      {/* Action Selection Area with Custom Dropdown Fix */}
      <div className="space-y-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative z-10">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
            Select Action
          </label>
          
          <details className="group relative w-full">
            <summary className="list-none cursor-pointer w-full p-4 flex items-center justify-between rounded-2xl border-2 border-gray-100 bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.99] focus:outline-none">
                <span className={`font-semibold truncate pr-4 ${selectedAction ? 'text-gray-900' : 'text-gray-400'}`}>
                {selectedAction || "Choose action..."}
                </span>
                <ChevronDown className="text-gray-400 w-5 h-5 transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>

            <div className="absolute left-0 top-full mt-2 w-full z-50 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-100 origin-top">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-normal">
                        Choose how you want to get this book...
                    </p>
                </div>
                {availabilityType.map((type) => (
                <div
                    key={type}
                    onClick={(e) => {
                        setSelectedAction(type);
                        setOfferedBook(null);
                        e.currentTarget.closest('details').removeAttribute('open'); // Close dropdown
                    }}
                    className="p-4 hover:bg-orange-50 cursor-pointer font-medium text-gray-700 hover:text-orange-700 flex items-center justify-between transition-colors border-b border-gray-50 last:border-0"
                >
                    <span className="truncate">{type}</span>
                    {selectedAction === type && <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 ml-2" />}
                </div>
                ))}
            </div>
          </details>
        </div>

        {selectedAction && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                  Message
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Short note to owner..."
                  className="w-full p-3 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none bg-white"
                />
              </div>
            </div>

            {selectedAction.toLowerCase() === 'swap' && (
              <div
                onClick={() => setIsSwapModalOpen(true)}
                className={`
                    cursor-pointer p-4 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between
                    ${offeredBook
                    ? 'border-green-500 bg-green-50'
                    : 'border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400'
                  }
                `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-full flex-shrink-0 ${offeredBook ? 'bg-green-200' : 'bg-orange-200'}`}>
                    {offeredBook ? <CheckCircle className="w-5 h-5 text-green-700" /> : <Repeat className="w-5 h-5 text-orange-700" />}
                  </div>
                  <div className="truncate">
                    <p className={`font-bold truncate ${offeredBook ? 'text-green-800' : 'text-orange-900'}`}>
                      {offeredBook ? "Book Selected for Swap" : "Select Book to Exchange"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {offeredBook ? offeredBook.title : "Click here to choose from your collection"}
                    </p>
                  </div>
                </div>
                {offeredBook && (
                  <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded-md flex-shrink-0">Change</span>
                )}
              </div>
            )}

            <button
              onClick={handleSendRequest}
              disabled={selectedAction.toLowerCase() === 'swap' && !offeredBook}
              className={`
                    w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2
                    ${(selectedAction.toLowerCase() === 'swap' && !offeredBook)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-orange-200'
                }
              `}
            >
              {icon}
              {label}
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={AddToFavoritesHandler}
          className="flex items-center gap-2 text-gray-500 font-semibold hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" /> Add to Wishlist
        </button>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Synopsis</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      <SwapBookModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        userBooks={user?.books || []}
        onSelectBook={handleBookSelection}
      />

    </div>
  );
};

export default BookInfo;