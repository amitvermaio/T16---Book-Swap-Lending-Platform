import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncfetchanalytics } from '../../store/actions/adminActions';
import {
  TrendingUp,
  BookOpen,
  Award,
  Calendar,
  Loader2,
  Star
} from 'lucide-react';

const Analytics = () => {
  const dispatch = useDispatch();
  const { topBooks, topContributors, borrowingTrends, isLoading } = useSelector((state) => state.admin.analytics);

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
    <div className="space-y-8 p-4 bg-gray-50/30 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500 text-sm">Insights from the database.</p>
        </div>
        <div className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Calendar size={16} className="text-orange-500" />
          Live Stats
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Trending Books</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {topBooks?.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black text-gray-200 w-6">
                      {index + 1}
                    </span>
                    <img
                      src={item.book?.coverImage}
                      alt=""
                      className="w-10 h-14 object-cover rounded bg-gray-100"
                    />
                    <div>
                      <p className="font-bold text-gray-800 leading-tight">{item.book?.title}</p>
                      <p className="text-xs text-gray-400">{item.book?.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-orange-600">
                      {item.count}
                    </span>
                    <p className="text-[10px] uppercase text-gray-400 font-bold">Borrows</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Award size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Top Lenders</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {topContributors?.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 font-bold flex items-center justify-center text-gray-600 border border-gray-200">
                      {item.user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.user?.name}</p>
                      <p className="text-xs text-gray-400">{item.count} Shared</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-yellow-500 gap-1">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold text-gray-700">
                        {item.user?.ratingStats?.avgRating || 0}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Rating</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Daily Volume</h2>
          </div>
          <div className="flex items-end justify-between h-40 gap-2">
            {borrowingTrends?.map((trend, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-blue-500 rounded-t-sm relative"
                  style={{ height: `${(trend.count / (Math.max(...borrowingTrends.map(t => t.count)) || 1)) * 100}%` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {trend.count}
                  </span>
                </div>
                <span className="text-[9px] text-gray-400 font-bold uppercase">{trend._id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;