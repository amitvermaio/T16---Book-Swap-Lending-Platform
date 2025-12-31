import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  MessageSquare,
  ArrowRightLeft
} from 'lucide-react';
import { asyncmarkcomplete } from '../store/actions/trackingActions';

const TrackingCard = ({ data, isLending }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const getDaysRemaining = (dueDateString) => {
    if (!dueDateString) return null;
    const today = new Date();
    const due = new Date(dueDateString);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysRemaining(data.dueDate);
  const isOverdue = daysLeft !== null && daysLeft < 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  const book = data.book || {};
  const offeredBook = data.offeredBook; 
  const pickup = data.pickupInfo || {};
  
  const otherUser = isLending ? data.requester : data.owner;
  const otherRole = isLending ? "Borrower" : "Lender";
  
  const otherUserName = otherUser?.name || "Unknown User";
  const otherUserAvatar = otherUser?.avatar?.url || otherUser?.avatar || "https://via.placeholder.com/40";
  const otherUserLocation = (otherUser?.city && otherUser?.state) 
    ? `${otherUser.city}, ${otherUser.state}` 
    : "Location not shared";

  const handleMarkReturned = async () => {
    if(!window.confirm(`Confirm that "${book.title}" has been returned to you?`)) return;
    
    setIsUpdating(true);
    await dispatch(asyncmarkcomplete(data._id));
    setIsUpdating(false);
  };

  const getStatusBadge = () => {
    if (isOverdue && data.status === 'approved') {
      return (
        <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-100">
          <AlertTriangle size={10} /> Overdue by {Math.abs(daysLeft)} days
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-green-100">
        <Clock size={10} /> Active
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      
      <div className="p-5 flex gap-5">
        <div className="relative w-20 h-28 flex-shrink-0">
          <img 
            src={book.coverImageUrl || book.cover} 
            alt={book.title} 
            className="w-full h-full object-cover rounded-lg shadow-sm bg-gray-100" 
          />
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md border border-gray-100">
            {data.type === 'swap' ? <RefreshCw size={14} className="text-orange-500"/> : <ArrowRightLeft size={14} className="text-blue-500"/>}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-bold text-gray-900 truncate pr-2">{book.title}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-gray-500 mb-3">by {book.author}</p>

          <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5">
               <Calendar size={12} className="text-gray-400"/>
               <span>Due: <span className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                 {data.dueDate ? new Date(data.dueDate).toLocaleDateString() : 'No Due Date'}
               </span></span>
            </div>
            {daysLeft !== null && !isOverdue && (
               <span className="text-orange-600 font-medium text-[10px] bg-orange-50 px-1.5 py-0.5 rounded">
                 {daysLeft} days left
               </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 space-y-3">
        
        {data.type === 'swap' && offeredBook && (
          <div className="flex items-center gap-3 bg-orange-50/50 p-3 rounded-xl border border-orange-100 border-dashed">
            <img 
              src={offeredBook.coverImageUrl || offeredBook.cover} 
              alt={offeredBook.title}
              className="w-10 h-14 object-cover rounded shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wide mb-0.5">Swapped For</p>
              <p className="text-xs font-bold text-gray-900 truncate">{offeredBook.title}</p>
              <p className="text-[10px] text-gray-500 truncate">{offeredBook.author}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {pickup.location && (
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Meeting Point</p>
                <p className="leading-tight">{pickup.location}</p>
              </div>
            </div>
          )}
          {pickup.datetime && (
            <div className="flex items-start gap-2 text-gray-600">
              <Clock size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Scheduled Time</p>
                <p className="leading-tight">{formatDate(pickup.datetime)}</p>
              </div>
            </div>
          )}
        </div>

        {(pickup.note || data.notes) && (
          <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg italic">
            <MessageSquare size={12} className="mt-0.5 flex-shrink-0" />
            <p>"{pickup.note || data.notes}"</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-4 bg-gray-50/30 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 min-w-0">
          <img 
            src={otherUserAvatar} 
            alt={otherUserName} 
            className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
          />
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-medium mb-0.5">{otherRole}</p>
            <p className="text-sm font-bold text-gray-800 leading-none truncate">{otherUserName}</p>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
              <MapPin size={8} /> {otherUserLocation}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {isLending ? (
            <button 
              onClick={handleMarkReturned}
              disabled={isUpdating}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all
                ${isUpdating 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-900 text-white hover:bg-black hover:shadow-lg active:scale-95'}
              `}
            >
              {isUpdating ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CheckCircle size={14} />
                  Mark Returned
                </>
              )}
            </button>
          ) : (
            <div className="text-right">
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Status</span>
              <span className="text-xs font-bold text-orange-600">
                {data.status === 'approved' ? 'In Possession' : data.status}
              </span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TrackingCard;