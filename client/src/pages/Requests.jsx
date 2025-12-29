import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import RequestCard from "../components/RequestCard"; 
import { ArrowRightLeft } from 'lucide-react';
import { socket } from '../socket';
import { useSelector } from 'react-redux';

const INCOMING_REQUESTS = [
  {
    id: 1,
    type: 'swap',
    status: 'pending',
    date: '2 hours ago',
    book: {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg'
    },
    requester: {
      name: 'Alex Johnson',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop'
    },
    message: "Hey! I have 'Rich Dad Poor Dad' to swap. Interested?"
  },
  {
    id: 2,
    type: 'lend',
    status: 'pending',
    date: '1 day ago',
    book: {
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'https://m.media-amazon.com/images/I/81Ua99CURsL._AC_UY218_.jpg'
    },
    requester: {
      name: 'Emily Davis',
      location: 'Brooklyn, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop'
    },
    message: "I'd love to borrow this for a week. I promise to take care of it!"
  }
];

const SENT_REQUESTS = [
  {
    id: 3,
    type: 'swap',
    status: 'accepted',
    date: '3 days ago',
    book: {
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg'
    },
    owner: {
      name: 'Michael Brown',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
    },
    message: "Offering my copy of 'Deep Work' for this."
  }
];

const Requests = () => {
  const [activeTab, setActiveTab] = useState('incoming');

  const users = useSelector(state => state.users);
  const requests = activeTab === 'incoming' ? INCOMING_REQUESTS : SENT_REQUESTS;

  useEffect(() => {
    if (users.isAuthorized) {
      socket.on('notification:new', (data) => {
        console.log(data);
      })
    }
  }, [users.isAuthorized]);

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white text-gray-900 pb-20">
      <Navbar />
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-1">Book Requests</h1>
        <p className="text-sm text-gray-500">Manage your swaps and lending history.</p>
        
        {/* Tabs */}
        <div className="flex gap-8 mt-8 border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('incoming')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'incoming' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Incoming <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{INCOMING_REQUESTS.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('sent')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'sent' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Sent <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">{SENT_REQUESTS.length}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-3xl mx-auto space-y-4 mt-6">
        {requests.length > 0 ? (
          requests.map(req => (
            <RequestCard 
              key={req.id} 
              request={req} 
              isIncoming={activeTab === 'incoming'} 
            />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl mt-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
               <ArrowRightLeft className="text-gray-300" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No requests found</h3>
            <p className="text-gray-500 text-sm mt-1">
              {activeTab === 'incoming' 
                ? "You haven't received any requests yet." 
                : "You haven't sent any requests yet."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Requests;