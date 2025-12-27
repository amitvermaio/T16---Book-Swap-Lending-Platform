import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import TrackingCard from "../components/TrackingCard"; 
import { PackageSearch } from 'lucide-react';

// --- MOCK DATA (Updated Dates for Demo) ---
const LENDING_TRACKING = [
  {
    id: 1,
    type: 'lend',
    status: 'active',
    book: {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg'
    },
    user: {
      name: 'Alex Johnson',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop'
    },
    startDate: '2025-12-20',
    dueDate: '2025-12-30', // Future date (Active)
    progress: 70, 
  },
  {
    id: 2,
    type: 'swap',
    status: 'completed',
    book: {
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'https://images-na.ssl-images-amazon.com/images/I/9158ofE+gSL.jpg'
    },
    user: {
      name: 'Sarah Jenkins',
      location: 'Portland, OR',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    },
    startDate: '2025-12-01',
    dueDate: '2025-12-15',
    progress: 100,
  }
];

const BORROWING_TRACKING = [
  {
    id: 3,
    type: 'lend',
    status: 'overdue',
    book: {
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg'
    },
    user: {
      name: 'Michael Brown',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
    },
    startDate: '2025-12-01',
    dueDate: '2025-12-25', // Past date (Overdue)
    progress: 100, 
  }
];

const Tracking = () => {
  const [activeTab, setActiveTab] = useState('lending');

  const transactions = activeTab === 'lending' ? LENDING_TRACKING : BORROWING_TRACKING;

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white text-gray-900 pb-20">
      <Navbar />
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-1">Track Books</h1>
        <p className="text-sm text-gray-500">Monitor active loans, swaps, and returns.</p>
        
        {/* Tabs */}
        <div className="flex gap-8 mt-8 border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('lending')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'lending' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Lending <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{LENDING_TRACKING.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('borrowing')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'borrowing' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Borrowing <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{BORROWING_TRACKING.length}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto space-y-5 mt-6">
        {transactions.length > 0 ? (
          transactions.map(item => (
            <TrackingCard 
              key={item.id} 
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