import React, { useEffect } from 'react';
import { Users, BookOpen, AlertTriangle, Activity, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncfetchanalytics } from '../../store/actions/adminActions';

const StatCard = ({ title, count, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-800 tracking-tighter">
          {count?.toLocaleString() || 0}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { usersList, booksList, disputes, onGoingRequests, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(asyncfetchanalytics());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Overview of platform activity and health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          count={usersList?.length}
          icon={<Users size={22} className="text-blue-600" />}
          colorClass="bg-blue-50"
        />
        <StatCard
          title="Active Listings"
          count={booksList?.length}
          icon={<BookOpen size={22} className="text-orange-600" />}
          colorClass="bg-orange-50"
        />
        <StatCard
          title="Disputes Open"
          count={disputes?.length}
          icon={<AlertTriangle size={22} className="text-red-600" />}
          colorClass="bg-red-50"
        />
        <StatCard
          title="Ongoing Requests"
          count={onGoingRequests}
          icon={<Activity size={22} className="text-green-600" />}
          colorClass="bg-green-50"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight mb-4">System Notices</h2>
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
          <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          <div>
            <p className="text-orange-900 font-medium text-sm">System Healthy</p>
            <p className="text-orange-700/80 text-xs mt-1">
              All database connections are stable. Stats updated just now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;