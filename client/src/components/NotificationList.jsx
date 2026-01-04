import { BookOpen, Bell, CheckCheck, Star } from "lucide-react";

const NotificationList = ({ notifications, onMarkRead }) => {
  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={onMarkRead}
            className="text-[10px] flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <CheckCheck size={12} /> Mark all read
          </button>
        )}
      </div>

      {/* List Container */}
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notif, idx) => {
            const isRating = notif.type === "RATING_RECEIVED";

            return (
              <div
                key={notif._id || idx}
                className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex gap-3 transition-colors ${!notif.isRead ? "bg-orange-50/50" : ""
                  }`}
              >
                {/* Icon Section - Changes based on Type */}
                <div
                  className={`w-10 h-10 rounded-md border shadow-sm flex-shrink-0 flex items-center justify-center 
                  ${isRating
                      ? "bg-yellow-50 border-yellow-100 text-yellow-500"
                      : "bg-white border-gray-100 text-orange-600"
                    }`}
                >
                  {isRating ? <Star size={18} fill="currentColor" /> : <BookOpen size={18} />}
                </div>

                <div className="flex-1">
                  {isRating ? (
                    // --- SPECIAL LAYOUT FOR RATINGS ---
                    <>
                      <p className="text-xs font-bold text-gray-800">
                        {notif.data.senderName || "Someone"} rated you
                      </p>

                      {/* Star Display Row */}
                      <div className="flex items-center gap-0.5 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className={`${i < (notif.data.score || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-200 fill-gray-200"
                              }`}
                          />
                        ))}
                        <span className="text-[10px] text-gray-400 ml-1 font-medium">
                          ({notif.data.score}.0)
                        </span>
                      </div>

                      {/* Comment */}
                      {notif.data.comment && (
                        <p className="text-xs text-gray-600 italic border-l-2 border-gray-200 pl-2 mb-1">
                          "{notif.data.comment}"
                        </p>
                      )}
                    </>
                  ) : (
                    // --- STANDARD LAYOUT FOR OTHER NOTIFICATIONS ---
                    <>
                      <p className="text-xs font-bold text-gray-800 uppercase">
                        {notif.type?.replace("_", " ") || "Notification"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                    </>
                  )}

                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleDateString()} •{" "}
                    {new Date(notif.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-4 py-8 text-center text-gray-400 text-xs flex flex-col items-center gap-2">
            <Bell size={20} className="text-gray-200" />
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;