import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Deep dive into platform data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Borrowed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-6 text-orange-600 tracking-tight">Trending Books</h2>
          <ul className="space-y-4">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-gray-200 rounded-md"></div>
                  <span className="font-semibold text-gray-800">Rich Dad Poor Dad</span>
                </div>
                <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-md">24 Borrows</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Contributors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-6 text-orange-600 tracking-tight">Top Lenders</h2>
          <ul className="space-y-4">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center text-sm border border-gray-200">V</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Verma</p>
                    <p className="text-xs text-gray-400">12 Books Listed</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-bold">4.9 ★</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;