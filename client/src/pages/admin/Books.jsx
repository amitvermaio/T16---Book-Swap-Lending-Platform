import { Check, X, Search } from 'lucide-react';

const AdminBooks = () => {
  const books = [
    { id: 101, title: 'Clean Code', owner: 'Dev Raj', status: 'Pending' },
    { id: 102, title: 'The Alchemist', owner: 'Sara Khan', status: 'Approved' },
    { id: 103, title: 'Physics HC Verma', owner: 'Student A', status: 'Flagged' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter">Book Listings</h1>
          <p className="text-gray-500 text-sm mt-1">Verify and manage shared books.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search books..."
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Owner</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5 font-semibold text-gray-900">{book.title}</td>
                <td className="p-5 text-gray-500 text-sm">{book.owner}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${book.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      book.status === 'Flagged' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                    {book.status}
                  </span>
                </td>
                <td className="p-5 text-right space-x-2 flex justify-end">
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><Check size={16} /></button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><X size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooks;