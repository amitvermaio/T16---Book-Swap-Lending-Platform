import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';

const FeedbackSection = ({ user, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    const isSuccess = await onSubmit({ rating, comment });
    
    if (isSuccess) {
      setSubmitted(true);
    } 
    setIsSubmitting(false);
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
      <p className="text-xs font-bold text-gray-800 mb-2">Rate your Experience with {user}</p>
      
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

export default FeedbackSection;