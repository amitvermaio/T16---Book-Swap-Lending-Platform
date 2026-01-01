import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PackageSearch, Loader2, Inbox, Send, History } from 'lucide-react';
import { asyncfetchactivetrackings, asyncfetchhistory } from '../store/actions/trackingActions';

import Navbar from "../components/Navbar";
import TrackingCard from "../components/TrackingCard";

const Tracking = () => {
  const dispatch = useDispatch();
  // Extract history from state as well
  const { activeTrackings, history, isLoading } = useSelector((state) => state.trackings);
  const user = useSelector((state) => state.users.user);

  // Options: 'incoming', 'myrequests', 'history'
  const [activeTab, setActiveTab] = useState('incoming');

  useEffect(() => {
    if (!activeTrackings || activeTrackings.length === 0) {
      dispatch(asyncfetchactivetrackings());
    }

    if (!history || history.length === 0) {
      dispatch(asyncfetchhistory());
    }
  }, [dispatch]);

  const incomingList = activeTrackings.filter(
    (item) => item.owner?._id === user?._id || item.owner === user?._id
  );

  const myRequestsList = activeTrackings.filter(
    (item) => item.requester?._id === user?._id || item.requester === user?._id
  );

  // Determine current list based on tab
  let currentList = [];
  let emptyMessage = "";
  let EmptyIcon = PackageSearch;

  if (activeTab === 'incoming') {
    currentList = incomingList;
    emptyMessage = "No incoming book requests at the moment.";
    EmptyIcon = Inbox;
  } else if (activeTab === 'myrequests') {
    currentList = myRequestsList;
    emptyMessage = "You haven't requested any books recently.";
    EmptyIcon = Send;
  } else if (activeTab === 'history') {
    currentList = history;
    emptyMessage = "No past transaction history found.";
    EmptyIcon = History;
  }

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white text-gray-900 pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-1">Track Books</h1>
        <p className="text-sm text-gray-500">Manage your book exchanges and view history.</p>

        {/* --- TABS --- */}
        <div className="flex gap-6 mt-8 border-b border-gray-100 overflow-x-auto">

          {/* Tab 1: Incoming Requests */}
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex items-center gap-2 pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'incoming'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
          >
            <Inbox size={16} />
            Incoming Requests
            <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'incoming' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
              {incomingList.length}
            </span>
          </button>

          {/* Tab 2: My Requests */}
          <button
            onClick={() => setActiveTab('myrequests')}
            className={`flex items-center gap-2 pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'myrequests'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
          >
            <Send size={16} />
            My Requests
            <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'myrequests' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
              {myRequestsList.length}
            </span>
          </button>

          {/* Tab 3: History */}
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-all whitespace-nowrap ${activeTab === 'history'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
          >
            <History size={16} />
            History
            {history.length > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'history' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-5 mt-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" />
          </div>
        ) : currentList.length > 0 ? (
          currentList.map(item => {
            // Determine logic for History items (mix of lending/borrowing)
            // For active tabs, we know the role based on the list we are in.
            let isLending = false;

            if (activeTab === 'incoming') {
              isLending = true;
            } else if (activeTab === 'myrequests') {
              isLending = false;
            } else {
              // History: Check dynamic ownership
              isLending = item.owner?._id === user?._id || item.owner === user?._id;
            }

            return (
              <TrackingCard
                key={item._id}
                data={item}
                isLending={isLending}
              />
            );
          })
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl mt-4 border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <EmptyIcon className="text-gray-300" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">It's quiet here</h3>
            <p className="text-gray-500 text-sm mt-1">
              {emptyMessage}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Tracking;