import { Trash2, Search, Eye, MapPin } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncdeletebook } from '../../store/actions/adminActions';

const AdminBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.admin.booksList || []);

  const handleDelete = (id) => {
    let reason = window.prompt("Are you sure you want to delete this listing? This action cannot be undone.\n\n Type reason for deletion:");
    if (reason && reason.trim() !== "") {
      dispatch(asyncdeletebook(id, reason.trim()));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage Books</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor all active listings and remove inappropriate content.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none w-full md:w-72"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Book</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner & Location</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded border bg-gray-100 shadow-sm"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.author}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-800">{book.owner?.name || "Unknown"}</div>
                    <div className="flex items-center text-xs text-gray-400 mt-0.5">
                      <MapPin size={12} className="mr-1" />
                      {book.location?.city || "Unknown Location"}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${book.status === 'available' ? 'bg-green-100 text-green-700' :
                      book.status === 'unavailable' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {book.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => window.open(`/books/${book._id}`, '_blank')}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Listing"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No books found in the inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooks;