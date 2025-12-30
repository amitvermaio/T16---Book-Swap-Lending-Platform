import React, { useEffect, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { socket } from '../socket';
import { asyncloadallincomingrequests, asyncloadoutgoingrequests } from '../store/actions/requestActions';
import { removenewincomingrequest } from '../store/features/requestSlice';

import RequestCard from "../components/RequestCard"; 
import Navbar from "../components/Navbar";

const Requests = () => {
  const dispatch = useDispatch();
  const requestState = useSelector(state => state.requests);
  const users = useSelector(state => state.users);

  const [activeTab, setActiveTab] = useState('incoming');

  const requests = activeTab === 'incoming' 
    ? requestState.incomingRequests 
    : requestState.outgoingRequests;

  useEffect(() => {
    if (users.isAuthorized) {
      dispatch(asyncloadallincomingrequests());
      dispatch(asyncloadoutgoingrequests());

      if (activeTab === 'incoming') {
        dispatch(removenewincomingrequest());
      }

      socket.on('notification:new', (data) => {
        if (data.type === 'REQUEST_CREATED') {
            dispatch(asyncloadallincomingrequests());
        }
      });
      
      socket.on('request:updated', () => {
         dispatch(asyncloadallincomingrequests());
         dispatch(asyncloadoutgoingrequests());
      });
    }

    return () => {
      socket.off('notification:new');
      socket.off('request:updated');
    };
  }, [users.isAuthorized, dispatch, activeTab]);

  useEffect(() => {
    if (activeTab === 'incoming') {
        dispatch(removenewincomingrequest());
    }
  }, [activeTab, dispatch]);

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white text-gray-900 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-1">Book Requests</h1>
        <p className="text-sm text-gray-500">Manage your swaps and lending history.</p>
        
        <div className="flex gap-8 mt-8 border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('incoming')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'incoming' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Incoming 
            <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">
                {requestState.incomingRequests?.length || 0}
            </span>
          </button>
          
          <button 
            onClick={() => setActiveTab('sent')}
            className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all ${
              activeTab === 'sent' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Sent 
            <span className="ml-1 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">
                {requestState.outgoingRequests?.length || 0}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 mt-6">
        {requests && requests.length > 0 ? (
          requests.map(req => (
            <RequestCard 
              key={req._id} 
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