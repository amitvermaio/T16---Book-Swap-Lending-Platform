import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Bell } from "lucide-react";
import { incrementnewrequest } from "../store/features/requestSlice";
import { addnotification } from "../store/features/notificationSlice";
import { asyncmarkallread } from "../store/actions/notificationActions";
import { socket } from "../socket";

import NotificationList from "./NotificationList";

const NotificationBell = ({ isAuthorized, closeProfile }) => {
  const dispatch = useDispatch();
  const { list: notifications, unreadCount } = useSelector((state) => state.notifications);

  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      const handleNewNotification = (data) => {
        dispatch(addnotification(data));

        if (data.type === 'REQUEST_CREATED') {
          dispatch(incrementnewrequest());
        }

        toast(data.message, { icon: "🔔" });
      };

      socket.on("notification:new", handleNewNotification);
      socket.on("rating:new", handleNewNotification);

      return () => {
        socket.off("notification:new", handleNewNotification);
        socket.off("rating:new", handleNewNotification);
      };
    }
  }, [isAuthorized, dispatch]);

  const toggleNotif = () => {
    setNotifOpen(!notifOpen);
    if (notifOpen === false && closeProfile) {
      closeProfile();
    }
  };

  const handleMarkAllRead = () => {
    dispatch(asyncmarkallread());
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotif}
        className="relative group text-black hover:text-orange-500 transition-colors p-1"
      >
        <Bell className="h-5 w-5" strokeWidth={2} />

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {notifOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
          <NotificationList
            notifications={notifications}
            onMarkRead={handleMarkAllRead}
          />
        </>
      )}
    </div>
  );
};

export default NotificationBell;