import React from 'react';
import { AlertCircle, MessageSquare, CheckCircle, Gavel, Filter, MoreHorizontal } from 'lucide-react';

const Disputes = () => {
  // 1. Dummy Data (4 Entries)
  const disputes = [
    {
      id: '#DSP-2024-001',
      issue: 'Book Returned Damaged',
      borrower: 'Ravi Kumar',
      lender: 'Priya Verma',
      book: 'Clean Code',
      status: 'Open',
      date: 'Jan 10, 2026',
      priority: 'High'
    },
    {
      id: '#DSP-2024-002',
      issue: 'Book Not Received',
      borrower: 'Amit Singh',
      lender: 'Suresh Raina',
      book: 'The Alchemist',
      status: 'Escalated',
      date: 'Jan 08, 2026',
      priority: 'Critical'
    },
    {
      id: '#DSP-2024-003',
      issue: 'Late Return Fee Dispute',
      borrower: 'Sneha Gupta',
      lender: 'Rahul Dravid',
      book: 'Physics HC Verma',
      status: 'Resolved',
      date: 'Jan 05, 2026',
      priority: 'Low'
    },
    {
      id: '#DSP-2024-004',
      issue: 'Wrong Book Delivered',
      borrower: 'Vikram Batra',
      lender: 'Anjali Sharma',
      book: 'Atomic Habits',
      status: 'Open',
      date: 'Jan 12, 2026',
      priority: 'Medium'
    }
  ];

  // Helper for Status Badge Styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Escalated': return 'bg-red-100 text-red-700 border-red-200';
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">Dispute Resolution</h1>
          <p className="text-gray-500 text-sm mt-1">Manage conflicts between borrowers and lenders.</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md">
            Download Report
          </button>
        </div>
      </div>

      {/* Disputes Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Dispute ID & Date</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Involved Parties</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Issue & Book</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {disputes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">

                  {/* ID & Date */}
                  <td className="p-5">
                    <p className="font-semibold text-gray-900 text-sm">{item.id}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </td>

                  {/* Parties */}
                  <td className="p-5">
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">B: <span className="font-normal text-gray-600">{item.borrower}</span></p>
                      <p className="text-gray-900 font-medium mt-1">L: <span className="font-normal text-gray-600">{item.lender}</span></p>
                    </div>
                  </td>

                  {/* Issue */}
                  <td className="p-5">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-orange-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium text-sm">{item.issue}</p>
                        <p className="text-xs text-gray-500 italic mt-0.5">Ref: {item.book}</p>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Message Parties"
                      >
                        <MessageSquare size={18} />
                      </button>

                      <button
                        className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Resolve Dispute"
                      >
                        <Gavel size={18} />
                      </button>

                      <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Visual Only) */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 4 of 4 disputes</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disputes;