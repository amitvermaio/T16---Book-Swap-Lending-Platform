import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Navbar from "../components/Navbar";
import TrackingCard from "../components/TrackingCard"; 
import { PackageSearch, Loader2 } from 'lucide-react';
import { asyncfetchactivetrackings } from '../store/actions/trackingActions'; // 2. Import Action

const Tracking = () => {
  const dispatch = useDispatch();
  const { activeTrackings, isLoading } = useSelector((state) => state.trackings);
  const user = useSelector((state) => state.users.user); 

  const [activeTab, setActiveTab] = useState('lending');

  useEffect(() => {
    dispatch(asyncfetchactivetrackings());
  }, [dispatch]);

  const lendingList = activeTrackings.filter(
    (item) => item.owner?._id === user?._id || item.owner === user?._id
  );

  const borrowingList = activeTrackings.filter(
    (item) => item.requester?._id === user?._id || item.requester === user?._id
  );

  const transactions = activeTab === 'lending' ? lendingList : borrowingList;

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white text-gray-900 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-1">Track Books</h1>
        <p className="text-sm text-gray-500">Monitor active loans, swaps, and returns.</p>
        
        <div className="flex gap-8 mt-8 border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('lending')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'lending' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Lending <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{lendingList.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('borrowing')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'borrowing' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Borrowing <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{borrowingList.length}</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-5 mt-6">
        {isLoading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-orange-500" />
             </div>
        ) : transactions.length > 0 ? (
          transactions.map(item => (
            <TrackingCard 
              key={item._id}
              data={item} 
              isLending={activeTab === 'lending'} 
            />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl mt-4 border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
               <PackageSearch className="text-gray-300" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No active tracking</h3>
            <p className="text-gray-500 text-sm mt-1">
              {activeTab === 'lending' 
                ? "You aren't lending any books right now." 
                : "You aren't borrowing any books right now."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Tracking;