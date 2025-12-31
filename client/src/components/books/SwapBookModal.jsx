import { X, Book } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncloaduserbooks } from '../../store/actions/usersAction';

const SwapBookModal = ({ isOpen, onClose, onSelectBook }) => {
  
  const { bookCollection, isAuthorized } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && isAuthorized) {
      dispatch(asyncloaduserbooks());
    }
  }, [isOpen, isAuthorized, dispatch]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">

        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Select a Book to Swap</h2>
            <p className="text-sm text-gray-500">Choose a book from your collection to offer.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {bookCollection && bookCollection.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookCollection.map((book) => (
                <div
                  key={book._id}
                  onClick={() => onSelectBook(book)}
                  className="cursor-pointer group flex gap-4 p-3 rounded-2xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
                >
                  <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={book.coverImageUrl || "https://placehold.co/100x150?text=No+Cover"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-orange-700">{book.title}</h4>
                    <p className="text-xs text-gray-500">{book.author}</p>
                    <span className="mt-2 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-white px-2 py-1 rounded-full border border-orange-100">
                      Select
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No books found</h3>
              <p className="text-gray-500">You haven't added any books to your collection yet.</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full py-3 font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapBookModal;