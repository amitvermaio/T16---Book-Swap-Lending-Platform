import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Calendar,
  Star,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { asyncloaduserprofile } from "../store/actions/profileActions";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
    <div className="p-2 rounded-lg bg-gray-50 text-orange-600">
      {icon}
    </div>
    <div>
      <p className="text-lg font-bold text-gray-900 leading-none">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  </div>
);

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { user, books, loadingUser, loadingBooks, error } = useSelector(
    (state) => state.profiles
  );

  useEffect(() => {
    if (userId) dispatch(asyncloaduserprofile(userId));
  }, [userId, dispatch]);

  if (loadingUser || loadingBooks) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-red-500 bg-red-50 border border-red-100 px-4 py-2 rounded-lg font-medium">
          {error}
        </p>
      </div>
    );
  }

  if (!user) return null;

  const userBooks = books || [];

  return (
    <div className="w-screen min-h-screen bg-gray-50 px-6 lg:px-12 pb-12 max-w-7xl mx-auto">
      <Navbar />

      {/* hero profile section */}
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-6 mb-10">
        {/* top accent */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-orange-600" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* left -> avatar + info */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.name}&background=f97316&color=fff`
                }
                alt={user.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />

              {user.emailVerified && (
                <div className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} />
                  Verified User
                </div>
              )}
            </div>

            {/* right info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900">
                    {user.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    {(user.city || user.state) && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-orange-500" />
                        {user.city}, {user.state}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <StatCard
                  icon={<Star size={18} />}
                  label="Avg Rating"
                  value={`${user.ratingStats?.avgRating?.toFixed(1) || "0.0"} (${user.ratingStats?.totalRatings || 0})`}
                />
                <StatCard
                  icon={<BookOpen size={18} />}
                  label="Books Listed"
                  value={userBooks.length}
                />
                <StatCard
                  icon={<Calendar size={18} />}
                  label="Member Since"
                  value={new Date(user.createdAt).getFullYear()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        {/* Book Shelf Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-900 pb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-600 rounded-full" />
            Books Shelf
          </h2>
        </div>

        {userBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <BookOpen size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-900 font-medium">
              No books listed yet
            </p>
            <p className="text-gray-500 text-sm">
              This user hasn’t shared any books.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {userBooks.map((book) => (
              <BookCard
                key={book._id}
                {...book}
                owner={user}
                location={{ city: user.city, state: user.state }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;