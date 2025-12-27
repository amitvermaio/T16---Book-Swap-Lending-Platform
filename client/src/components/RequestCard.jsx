import React from 'react';
import { 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Check, 
  X, 
  Clock, 
  ArrowRightLeft, 
  BookOpen,
  MoreHorizontal
} from 'lucide-react';

const RequestCard = ({ request, isIncoming }) => {
  const isPending = request.status === 'pending';

  // Helper for Status Badge Styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted': 
        return <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wide rounded-full">Accepted</span>;
      case 'rejected': 
        return <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wide rounded-full">Declined</span>;
      default: 
        return <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wide rounded-full flex items-center gap-1"><Clock size={12} /> Pending</span>;
    }
  };

  // Helper for Type Icon
  const getTypeIcon = (type) => {
    return type === 'swap' 
      ? <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase"><ArrowRightLeft size={12} /> Swap</div>
      : <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase"><BookOpen size={12} /> Lend</div>;
  };

  const otherUser = isIncoming ? request.requester : request.owner;

  return (
    <div className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-5">
        
        {/* 1. Book Cover (Left) */}
        <div className="w-full sm:w-24 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden relative">
          <img src={request.book.cover} alt={request.book.title} className="w-full h-full object-cover" />
        </div>

        {/* 2. Content (Middle) */}
        <div className="flex-1 flex flex-col justify-between">
          
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2 items-center">
                {getTypeIcon(request.type)}
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                   <Calendar size={12} /> {request.date}
                </span>
              </div>
              {/* Status Badge (Desktop) */}
              <div className="hidden sm:block">
                 {getStatusBadge(request.status)}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 leading-tight">{request.book.title}</h3>
            <p className="text-sm text-gray-500 mb-3">by {request.book.author}</p>

            {/* User Info */}
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl w-fit">
              <img src={otherUser.avatar} alt={otherUser.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-gray-900">{isIncoming ? "Request from" : "Owner"}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">{otherUser.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><MapPin size={10} /> {otherUser.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Bubble */}
          {request.message && (
            <div className="mt-3 flex gap-2 items-start text-xs text-gray-600 italic">
               <MessageSquare size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
               <p>"{request.message}"</p>
            </div>
          )}
        </div>

        {/* 3. Actions (Right) */}
        <div className="flex sm:flex-col justify-end gap-2 sm:border-l sm:border-gray-100 sm:pl-5 sm:w-32 flex-shrink-0">
          
          {/* Mobile Status Badge */}
          <div className="sm:hidden mr-auto">{getStatusBadge(request.status)}</div>

          {isIncoming && isPending ? (
            <>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                <Check size={14} /> Accept
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                <X size={14} /> Decline
              </button>
            </>
          ) : !isIncoming && isPending ? (
            <button className="w-full border border-gray-200 text-gray-500 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 hover:text-red-500 transition-colors">
               Cancel
            </button>
          ) : (
             <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500 transition-colors py-2">
               <MoreHorizontal size={20} />
             </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default RequestCard;