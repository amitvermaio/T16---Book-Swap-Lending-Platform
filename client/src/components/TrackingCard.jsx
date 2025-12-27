import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Hourglass
} from 'lucide-react';

const TrackingCard = ({ data, isLending }) => {
  
  // 1. Logic to calculate days remaining
  const getDaysRemaining = (dueDateString) => {
    const today = new Date();
    const due = new Date(dueDateString);
    // Calculate difference in milliseconds
    const diffTime = due - today;
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysRemaining(data.dueDate);
  const isOverdue = daysLeft < 0;
  const isCompleted = data.status === 'completed';

  // 2. Status Badge Config
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

  const statusConfig = getStatusConfig(data.status);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex gap-5">
        
        {/* Book Cover */}
        <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm relative">
           <img src={data.book.cover} alt={data.book.title} className="w-full h-full object-cover" />
           {/* Type Badge */}
           <div className="absolute top-0 left-0 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-br-lg">
             {data.type}
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight mb-0.5">{data.book.title}</h3>
              <p className="text-xs text-gray-500">by {data.book.author}</p>
            </div>
            
            {/* Status Pill */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mt-4 mb-2">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                Due: {data.dueDate}
              </span>
              
              {/* --- NEW: Days Remaining Badge --- */}
              {!isCompleted && (
                 <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md ${
                    isOverdue 
                      ? "bg-red-50 text-red-600" 
                      : "bg-orange-50 text-orange-600"
                 }`}>
                    <Hourglass size={12} />
                    {isOverdue 
                      ? `${Math.abs(daysLeft)} Days Overdue` 
                      : `${daysLeft} Days Remaining`
                    }
                 </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isOverdue ? 'bg-red-500' : 'bg-orange-500'}`} 
                style={{ width: `${Math.min(data.progress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* User & Action Row */}
          <div className="flex items-center justify-between mt-1">
            
            <div className="flex items-center gap-2">
               <img src={data.user.avatar} alt={data.user.name} className="w-6 h-6 rounded-full object-cover border border-gray-100" />
               <div className="text-xs">
                 <span className="text-gray-400">{isLending ? "With:" : "From:"} </span>
                 <span className="font-bold text-gray-700">{data.user.name}</span>
               </div>
            </div>

            <div className="flex items-center gap-2">
               {data.status === 'active' || data.status === 'overdue' ? (
                 <button className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
                   {isLending ? "Mark Returned" : "Return Book"}
                 </button>
               ) : (
                 <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">
                   Archive
                 </button>
               )}
               <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors">
                  <MoreVertical size={16} />
               </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TrackingCard;