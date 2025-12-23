import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { MoveRight, LogIn, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-7">

          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 object-contain" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex font-Inter items-center gap-12 text-xs tracking-tight text-black uppercase">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4"
                  : "text-black"
              }
            >
              Browse Books
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4"
                  : "text-black"
              }
            >
              Requests
            </NavLink>

            <NavLink
              to="/tracking"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4"
                  : "text-black"
              }
            >
              Tracking
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4"
                  : "text-black"
              }
            >
              About
            </NavLink>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">

            {/* Search Bar Desktop */}
            <div className="relative hidden sm:block">
              <Search
                className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-black"
                strokeWidth={2}
              />

              <input
                type="text"
                placeholder="Search..."
                className="w-40 sm:w-48 rounded-full border border-black pl-10 pr-4 py-2 text-sm font-medium outline-none"
              />
            </div>

            {/* Search Icon Mobile */}
            <button className="block sm:hidden">
              <Search className="h-5 w-5 text-black" strokeWidth={2} />
            </button>

            {/* Signup Button */}
            <Link
              to="/signup"
              className="bg-black text-white rounded-full px-5 py-2 text-xs sm:text-sm font-medium"
            >
              <span className="hidden sm:inline">Sign Up</span>
              <LogIn className="inline-block sm:ml-2 h-4 w-4" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-black" strokeWidth={2} />
            </button>
          </div>

        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#fbf7f3] shadow-lg z-50 transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-black/10">
          <img src={Logo} alt="Logo" className="h-10 object-contain" />

          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Sidebar links */}
        <div className="flex flex-col gap-6 px-6 pt-8 text-black font-Inter uppercase tracking-tight">

          <NavLink
            to="/browse-books"
            onClick={() => setSidebarOpen(false)}
          >
            Browse Books
          </NavLink>

          <NavLink
            to="/requests"
            onClick={() => setSidebarOpen(false)}
          >
            Requests
          </NavLink>

          <NavLink
            to="/tracking"
            onClick={() => setSidebarOpen(false)}
          >
            Tracking
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </NavLink>
        </div>

      </div>

      {/* Overlay behind sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
