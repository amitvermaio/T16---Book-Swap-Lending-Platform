import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  ArrowRightLeft,
  ScanBarcode,
  Star,
  Send
} from 'lucide-react';
import { getDaysRemaining, formatDate } from '../utils/dataUtils';
import { asyncmarkcomplete, asyncverifycollection, asynccancelrequest } from '../store/actions/trackingActions';

const StatusBadge = ({ isOverdue, daysLeft, status }) => {
  if (status === 'collected') {
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
        <CheckCircle size={10} /> Collected
      </span>
    );
  }
  if (isOverdue && status === 'approved') {
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

const SwappedBookSection = ({ offeredBook }) => {
  if (!offeredBook) return null;
  return (
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
  );
};

const FeedbackSection = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    await onSubmit({ rating, comment });
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-4 text-center">
        <p className="text-green-600 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle size={14} /> Thanks for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 bg-yellow-50/40 border border-yellow-100 rounded-xl p-4 transition-all">
      <p className="text-xs font-bold text-gray-800 mb-2">Rate your experience</p>
      
      {/* Star Rating System */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform active:scale-90"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={20}
              className={`transition-colors duration-200 ${
                star <= (hover || rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 fill-transparent'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs font-medium text-yellow-600 pt-0.5">
          {rating > 0 ? ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1] : ''}
        </span>
      </div>

      {/* Comment Textarea */}
      <div className="relative">
        <textarea
          className="w-full text-xs p-3 pr-2 rounded-lg border border-yellow-200 bg-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none placeholder-gray-400"
          rows={3}
          placeholder="Write a comment (optional)..."
          maxLength={300}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
          {comment.length}/300
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className={`
          mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all
          ${rating === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm hover:shadow active:scale-95'}
        `}
      >
        {isSubmitting ? 'Submitting...' : (
          <>
            Submit Feedback <Send size={12} />
          </>
        )}
      </button>
    </div>
  );
};

const ActionFooter = ({ isLending, isUpdating, handleMarkReturned, handleCancelRequest, status }) => {
  if (isLending) {
    if (status === 'collected') {
      return (
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
          {isUpdating ? <span>Processing...</span> : (
            <>
              <CheckCircle size={14} /> Mark Returned
            </>
          )}
        </button>
      );
    }

    return (
      <span className="text-xs font-bold text-orange-600">
        {status === 'approved' ? 'Waiting for Collection' : status}
      </span>
    );
  }

  if (!isLending) {
    if (status === 'approved') {
      return (
        <button
          onClick={handleCancelRequest}
          className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-2 rounded transition-colors"
        >
          Cancel Request
        </button>
      )
    }
    return (
      <div className="text-right">
        <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Status</span>
        <span className="text-xs font-bold text-orange-600 capitalize">
          {status}
        </span>
      </div>
    );
  }
};

const TrackingCard = ({ data, isLending }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [verificationCode, setVerificationCode] = useState(''); 

  const daysLeft = getDaysRemaining(data.dueDate);
  const isOverdue = daysLeft !== null && daysLeft < 0;

  const book = data.book || {};
  const pickup = data.pickupInfo || {};

  const otherUser = isLending ? data.requester : data.owner;
  const otherRole = isLending ? "Borrower" : "Lender";
  const otherUserName = otherUser?.name || "Unknown User";
  const otherUserAvatar = otherUser?.avatar?.url || otherUser?.avatar || "https://via.placeholder.com/40";
  const otherUserLocation = (otherUser?.city && otherUser?.state)
    ? `${otherUser.city}, ${otherUser.state}`
    : "Location not shared";

  const handleMarkReturned = async () => {
    if (!window.confirm(`Confirm that "${book.title}" has been returned to you?`)) return;
    setIsUpdating(true);
    await dispatch(asyncmarkcomplete(data._id));
    setIsUpdating(false);
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) return alert("Enter 6-digit code");
    setIsUpdating(true);
    await dispatch(asyncverifycollection(data._id, verificationCode));
    setIsUpdating(false);
  };

  const handleCancelRequest = () => {
    dispatch(asynccancelrequest({ requestId: data._id }));
  }

  // --- HANDLER FOR BACKEND INTEGRATION ---
  const handleFeedbackSubmit = async ({ rating, comment }) => {
    // TODO: Add your backend logic here
    console.log("Submitting Feedback:", {
      requestId: data._id,
      rating: rating,
      comment: comment
    });
    
    // Example dispatch:
    // await dispatch(asyncSubmitFeedback(data._id, { rating, comment }));
    
    // Simulate delay
    return new Promise(resolve => setTimeout(resolve, 1000));
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
            {data.type === 'swap'
              ? <RefreshCw size={14} className="text-orange-500" />
              : <ArrowRightLeft size={14} className="text-blue-500" />
            }
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-bold text-gray-900 truncate pr-2">{book.title}</h3>
            <StatusBadge isOverdue={isOverdue} daysLeft={daysLeft} status={data.status} />
          </div>

          <p className="text-xs text-gray-500 mb-3">by {book.author}</p>

          <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-gray-400" />
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
        {data.type === 'swap' && <SwappedBookSection offeredBook={data.offeredBook} />}

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

        {/* EXCHANGE CODE LOGIC */}
        {!isLending && data.status === 'approved' && data.exchangeCode && (
          <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider mb-0.5">Pickup Code</p>
              <p className="text-indigo-900 text-xs">Tell this code to the owner upon collection</p>
            </div>
            <div className="text-2xl font-mono font-bold text-indigo-600 tracking-widest bg-white px-3 py-1 rounded border border-indigo-100 shadow-sm">
              {data.exchangeCode}
            </div>
          </div>
        )}

        {/* VERIFY CODE LOGIC */}
        {isLending && data.status === 'approved' && (
          <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <ScanBarcode size={14} className="text-orange-500" />
              <p className="text-xs font-bold text-orange-800">Verify Collection</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter Code"
                className="w-full text-xs p-2 rounded border border-gray-200 focus:outline-none focus:border-orange-500 font-mono text-center tracking-widest uppercase"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                onClick={handleVerifyCode}
                disabled={isUpdating || verificationCode.length < 4}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 rounded transition-colors disabled:opacity-50"
              >
                {isUpdating ? '...' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {data.status === 'completed' && (
          <FeedbackSection onSubmit={handleFeedbackSubmit} />
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
          <ActionFooter
            handleCancelRequest={handleCancelRequest}
            isLending={isLending}
            isUpdating={isUpdating}
            handleMarkReturned={handleMarkReturned}
            status={data.status}
          />
        </div>
      </div>

    </div>
  );
};

export default TrackingCard;