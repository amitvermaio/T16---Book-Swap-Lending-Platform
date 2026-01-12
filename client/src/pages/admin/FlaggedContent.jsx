import React from 'react';
import { Trash2, AlertOctagon } from 'lucide-react';

const FlaggedContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">Flagged Content</h1>
        <p className="text-gray-500 text-sm mt-1">Review inappropriate books or comments.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">All caught up!</h3>
        <p className="text-gray-500 mt-2">There is no flagged content pending review.</p>
      </div>

      {/* Example of what a flagged item looks like if it existed */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 flex justify-between items-center">
         <div>
            <div className="flex items-center gap-2 mb-2">
                <AlertOctagon size={16} className="text-red-500" />
                <span className="text-red-600 text-xs font-bold uppercase">Inappropriate Image</span>
            </div>
            <h4 className="font-bold text-gray-900">Book: "Adult Content Book"</h4>
            <p className="text-sm text-gray-500">Reported by: User123</p>
         </div>
         <div className="flex gap-2">
             <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">Ignore</button>
             <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 flex items-center gap-2">
                <Trash2 size={16} /> Remove
             </button>
         </div>
      </div> 
      */}
    </div>
  );
};

// Simple helper for empty state
const CheckCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
)

export default FlaggedContent;