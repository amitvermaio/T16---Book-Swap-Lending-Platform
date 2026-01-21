import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, MessageSquare, Gavel, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { getStatusStyle } from '../../utils/dataUtils';

const Disputes = () => {
  const { disputes } = useSelector((state) => state.admin);
  const [filter, setFilter] = useState('newest');

  const processedDisputes = useMemo(() => {
    let result = [...disputes];
    if (['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'].includes(filter)) {
      result = result.filter(d => d.status === filter);
    }
    return result.sort((a, b) => {
      if (filter === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [disputes, filter]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Dispute Resolution</h1>
            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
              {processedDisputes.length} Records
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Manage system-wide conflicts and reviews.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            id="dispute-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-orange-500 m-1 outline-none cursor-pointer shadow-sm hover:border-gray-300 transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="OPEN">Open</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Dispute Details</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Reason</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Message</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {processedDisputes.length > 0 ? processedDisputes.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-5">
                    <p className="font-semibold text-gray-900 text-sm">ID: {item._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} className="text-orange-500 shrink-0" />
                      <span className="text-gray-900 font-medium text-sm">
                        {item.reason.replace('_', ' ')}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="max-w-xs">
                      <p className="text-gray-600 text-sm truncate" title={item.message}>
                        {item.message || <span className="text-gray-300 italic">No message provided</span>}
                      </p>
                      {item.images?.length > 0 && (
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-blue-600 font-bold uppercase">
                          <ImageIcon size={12} /> {item.images.length} Image(s)
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide border ${getStatusStyle(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label="Message User">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" aria-label="Resolve">
                        <Gavel size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors" aria-label="More options">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle size={32} className="text-gray-200 mb-2" />
                      <p className="text-gray-400 text-sm italic">No records found matching this criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Disputes;