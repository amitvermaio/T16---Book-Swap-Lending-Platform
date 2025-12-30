import { BookOpen, Bell, CheckCheck } from "lucide-react";

const NotificationList = ({ notifications, onMarkRead }) => {
  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
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
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notif, idx) => (
            <div
              key={notif._id || idx}
              className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex gap-3 transition-colors ${!notif.read ? 'bg-orange-50/50' : ''}`}
            >
              <div className="w-10 h-10 rounded-md bg-white border border-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center text-orange-600">
                <BookOpen size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 uppercase">
                  {notif.type?.replace("_", " ") || "Notification"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {notif.message}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
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