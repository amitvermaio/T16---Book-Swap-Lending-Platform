import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { MoveRight, Menu, X, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { removeuser } from "../store/features/userSlice";
import { asyncfetchnotifications } from "../store/actions/notificationActions";

import LogoImg from "../assets/Logo.png";
import NotificationBell from "./NotificationBell";

const BASE_LINKS = [
  { path: "/books", label: "Browse Books" },
  { path: "/requests", label: "Requests" },
  { path: "/tracking", label: "Tracking" },
  { path: "/about", label: "About" },
];

const DesktopNav = ({ links }) => (
  <div className="hidden lg:flex font-Inter items-center gap-12 text-xs tracking-tight text-black uppercase">
    {links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          isActive ? "underline underline-offset-4 font-bold" : "text-black hover:text-orange-600 transition-colors"
        }
      >
        {link.label}
      </NavLink>
    ))}
  </div>
);

const MobileSidebar = ({ isOpen, closeSidebar, links }) => (
  <>
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#fbf7f3] shadow-lg z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-black/10">
        <img src={LogoImg} alt="Logo" className="h-10 object-contain" />
        <button onClick={closeSidebar}>
          <X className="h-6 w-6 text-black" />
        </button>
      </div>
      <div className="flex flex-col gap-6 px-6 pt-8 text-black font-Inter uppercase tracking-tight">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeSidebar}
            className={({ isActive }) => isActive ? "text-orange-600 font-bold" : ""}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
    {isOpen && (
      <div
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
      />
    )}
  </>
);

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuthorized, role } = useSelector((state) => state.users);

  const navLinks = BASE_LINKS
  useEffect(() => {
    if (isAuthorized) {
      dispatch(asyncfetchnotifications());
    }
  }, [isAuthorized, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("BookSwap_Token");
    dispatch(removeuser());
    toast.success("Logged Out Successfully!");
    setProfileOpen(false);
  };

  return (
    <>
      <nav className="w-full border-b border-black/10 relative z-30 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-7 px-4 xl:px-0">

          <Link to={"/"} className="flex items-center">
            <img src={LogoImg} alt="Logo" className="h-10 object-contain" />
          </Link>

          <DesktopNav links={navLinks} />

          <div className="flex items-center gap-4">

            {!isAuthorized ? (
              <Link
                to="/sign-in"
                className="bg-black text-white rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-transform hover:scale-105"
              >
                <span className="hidden sm:inline">Sign In</span>
                <MoveRight className="inline-block sm:ml-2 h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-4">

                <NotificationBell
                  isAuthorized={isAuthorized}
                  closeProfile={() => setProfileOpen(false)}
                />

                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-200 border border-gray-200 outline-none
                      ${profileOpen
                        ? "ring-2 ring-orange-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-orange-500 hover:ring-offset-2"
                      }
                    `}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar.url || user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-3 animate-in fade-in zoom-in-95 duration-200 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email || "user@example.com"}
                          </p>
                          {(role === 'admin' || role === 'superadmin') && (
                            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold uppercase">
                              {role}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        {(role === "admin" || role === "superadmin") && (
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm text-orange-600 font-bold hover:bg-orange-50 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Admin Dashboard
                          </Link>
                        )}

                        <Link
                          to={`/profile/${user?._id}`}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <User className="w-4 h-4 mr-3" />
                          My Profile
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </Link>

                        <div className="h-px bg-gray-100 my-2 mx-4"></div>

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button onClick={() => setSidebarOpen(true)} className="lg:hidden" >
              <Menu className="h-6 w-6 text-black" strokeWidth={2} />
            </button>

          </div>
        </div>
      </nav>

      <MobileSidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
        links={navLinks}
      />
    </>
  );
};

export default Navbar;