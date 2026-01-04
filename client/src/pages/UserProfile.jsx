import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Calendar, Star, BookOpen, ShieldCheck, Mail } from "lucide-react";
import { asyncloaduserprofile } from "../store/actions/profileActions";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { user, books, loadingUser, loadingBooks, error } = useSelector((state) => state.profiles);

  useEffect(() => {
    if (userId) {
      dispatch(asyncloaduserprofile(userId));
    }
  }, [userId, dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "swapped": return "bg-gray-100 text-gray-500 border-gray-200";
      case "lent": return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  if (loadingUser || loadingBooks) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  const userBooks = books || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen font-sans">


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 relative">
        <div className="h-3 w-full bg-orange-600"></div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=f97316&color=fff`}
                  alt={user.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {user.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                    {(user.city || user.state) && (
                      <div className="flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-default">
                        <MapPin size={15} />
                        <span>{user.city}, {user.state}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar size={15} />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                  <Mail size={16} /> Contact
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 leading-none">
                      {user.ratingStats?.avgRating?.toFixed(1) || "0.0"}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Avg Rating ({user.ratingStats?.totalRatings || 0})</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-black">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 leading-none">
                      {userBooks.length}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Books Listed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-600 rounded-full block"></span>
          Books Shelf
        </h2>
      </div>

      {userBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-900 font-medium">No books listed yet</p>
          <p className="text-gray-500 text-sm">This user hasn't added any books to their shelf.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {userBooks.map((book) => (
            <div
              key={book._id}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col"
            >

              <div className="aspect-[2/3] relative bg-gray-100 overflow-hidden">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </div>

                {book.status === 'available' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {/* quick view button here */}
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-gray-900 font-bold text-sm md:text-base leading-tight line-clamp-1 mb-1 group-hover:text-orange-600 transition-colors" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1 mb-3">{book.author}</p>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    {book.condition.replace('_', ' ')}
                  </span>

                  {book.status === 'available' ? (
                    <button className="text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded transition-colors shadow-sm">
                      Request
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-gray-300 cursor-not-allowed">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;