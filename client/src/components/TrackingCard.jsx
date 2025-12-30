import React from 'react';
import { Clock, CheckCircle2, AlertCircle, MoreVertical, Hourglass } from 'lucide-react';

const TrackingCard = ({ data, isLending }) => {
  const getDaysRemaining = (dueDateString) => {
    if(!dueDateString) return 0;
    const today = new Date();
    const due = new Date(dueDateString);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysRemaining(data.dueDate);
  // eslint-disable-next-line no-unused-vars
  const isOverdue = daysLeft < 0;

  const formattedDueDate = data.dueDate 
    ? new Date(data.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    : "No Date";

  const bookTitle = data.book?.title || "Unknown Title";
  const bookAuthor = data.book?.author || "Unknown Author";
  const bookCover = data.book?.coverImageUrl || data.book?.cover || ""; 
  
  const otherUser = isLending ? data.requester : data.owner;
  const otherUserName = otherUser?.name || "Unknown User";
  const otherUserAvatar = otherUser?.avatar?.url || otherUser?.avatar || "";

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active': 
        return { color: 'bg-green-100 text-green-700', icon: <Clock size={12} />, label: 'Active' };
      case 'overdue': 
        return { color: 'bg-red-100 text-red-600', icon: <AlertCircle size={12} />, label: 'Overdue' };
      case 'completed': 
        return { color: 'bg-gray-100 text-gray-600', icon: <CheckCircle2 size={12} />, label: 'Returned' };
      default: 
        return { color: 'bg-gray-100 text-gray-600', icon: null, label: status };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex gap-5">
        
        {/* Book Cover */}
        <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm relative">
           <img src={bookCover} alt={bookTitle} className="w-full h-full object-cover" />
           {/* Type Badge */}
           <div className="absolute top-0 left-0 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-br-lg">
             {data.type}
           </div>
        </div>

        {/* ... Rest of your UI ... */}
        {/* Use the mapped variables: bookTitle, otherUserName, formattedDueDate */}
        
        <div className="flex-1 flex flex-col justify-between">
           {/* Header */}
           <div className="flex justify-between items-start">
             <div>
               <h3 className="text-base font-bold text-gray-900 leading-tight mb-0.5">{bookTitle}</h3>
               <p className="text-xs text-gray-500">by {bookAuthor}</p>
             </div>
             {/* ... status pill ... */}
           </div>

           {/* Timeline */}
           <div className="mt-4 mb-2">
             <div className="flex justify-between items-end mb-2">
               <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                 Due: {formattedDueDate}
               </span>
               {/* ... Overdue Badge logic ... */}
             </div>
             {/* Progress Bar (Visual only for now) */}
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-orange-500 w-1/2"></div> 
             </div>
           </div>

           {/* User Row */}
           <div className="flex items-center justify-between mt-1">
             <div className="flex items-center gap-2">
                <img src={otherUserAvatar} alt={otherUserName} className="w-6 h-6 rounded-full object-cover border border-gray-100" />
                <div className="text-xs">
                  <span className="text-gray-400">{isLending ? "With:" : "From:"} </span>
                  <span className="font-bold text-gray-700">{otherUserName}</span>
                </div>
             </div>
             {/* ... Buttons ... */}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingCard;