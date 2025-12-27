import { MapPin, Calendar, CheckCircle2, Star, Shield, Mail } from "lucide-react";

const ProfileHeader = ({ user, bookCount }) => {
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
      
      {/* Avatar Section */}
      <div className="pt-2 px-8 pb-6 text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-sm mx-auto -mt-16 mb-4">
             {/* Initials Avatar */}
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white text-4xl font-bold tracking-tighter">
              {user.name.charAt(0)}
            </div>
          </div>
          {user.role === 'admin' && (
            <div className="absolute bottom-4 right-0 bg-blue-600 text-white p-1.5 rounded-full border-4 border-white" title="Admin">
              <Shield size={14} fill="currentColor" />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          {user.name}
          {/* Fake Verified Badge for "Authentic" look */}
          {user.ratingStats.avgRating > 4 && (
             <CheckCircle2 size={20} className="text-blue-500 fill-blue-50" />
          )}
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-1">
          <MapPin size={14} />
          <span>{user.city}, {user.state}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button className="py-2.5 px-4 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
            Edit Profile
          </button>
          <button className="py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Mail size={16} /> Contact
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Stats Row */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 py-4 bg-gray-50/50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 font-bold text-gray-900 text-lg">
            {user.ratingStats.avgRating} 
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
          </div>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Rating</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-gray-900 text-lg">{bookCount}</div>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Books Listed</div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Details List */}
      <div className="p-6 space-y-4">
        {user.about && (
            <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{user.about}</p>
            </div>
        )}

        <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Member Since</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>{joinDate}</span>
            </div>
        </div>

        <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Preferences</h4>
            <div className="flex flex-wrap gap-2">
                {user.lendingPreferences?.onlyLocal ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                        Local Swaps Only
                    </span>
                ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                        Open to Shipping
                    </span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;