import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  AlertCircle, MessageSquare, Gavel, MoreHorizontal,
  Image as ImageIcon, X, Maximize2, ExternalLink
} from 'lucide-react';
import { getStatusStyle } from '../../utils/dataUtils';

const Disputes = () => {
  // Using your existing Redux integration
  const { disputes } = useSelector((state) => state.admin);
  const [filter, setFilter] = useState('newest');

  // State for Large Image Preview
  const [previewImage, setPreviewImage] = useState(null);

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
    <div className="space-y-6 relative">
      {previewImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-10 right-10 text-white/70 hover:text-white transition-colors">
            <X size={40} />
          </button>
          <img
            src={previewImage}
            alt="Evidence Full View"
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10 object-contain"
          />
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dispute Resolution</h1>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-black rounded-full border border-orange-200 uppercase">
              {processedDisputes.length} Cases
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Investigate reports and maintain platform integrity.</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="OPEN">Open Cases</option>
          <option value="UNDER_REVIEW">In Review</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </header>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Case & Request</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Reported</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Evidence & Message</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {processedDisputes.length > 0 ? processedDisputes.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                  {/* Case Info with Real Request ID */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-orange-500 uppercase">Dispute ID</span>
                      <p className="font-mono text-xs font-bold text-gray-900 mb-2">#{item._id.toUpperCase()}</p>

                      <span className="text-[10px] font-bold text-blue-500 uppercase">Related Request ID</span>
                      <div className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                        <p className="font-mono text-[11px] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 italic">
                          {item.requestId?._id || item.requestId}
                        </p>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </td>

                  {/* Reason Section */}
                  <td className="p-5">
                    <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      <AlertCircle size={14} className="text-red-500" />
                      <span className="text-red-700 font-bold text-xs uppercase tracking-tight">
                        {item.reason.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic font-medium">
                      Created: {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </td>

                  {/* Message & Large Image Integration */}
                  <td className="p-5">
                    <div className="max-w-xs space-y-3">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2" title={item.message}>
                        "{item.message || "No specific details provided."}"
                      </p>

                      {item.images?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.images.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => setPreviewImage(img)}
                              className="relative h-14 w-14 rounded-md overflow-hidden border border-gray-200 cursor-zoom-in group/img"
                            >
                              <img src={img} alt="Evidence" className="h-full w-full object-cover transition-transform group-hover/img:scale-110" />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                <Maximize2 size={14} className="text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border shadow-sm ${getStatusStyle(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:shadow-md rounded-xl transition-all shadow-sm">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-orange-600 hover:shadow-md rounded-xl transition-all shadow-sm">
                        <Gavel size={18} />
                      </button>
                      <button className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:shadow-md rounded-xl transition-all shadow-sm">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <AlertCircle size={48} className="text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-500 italic">No disputes found</p>
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