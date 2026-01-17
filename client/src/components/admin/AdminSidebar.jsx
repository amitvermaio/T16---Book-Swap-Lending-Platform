import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, Gavel,
  BarChart2, LogOut, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Book Management', path: '/admin/books', icon: <BookOpen size={20} /> },
    { name: 'Disputes', path: '/admin/disputes', icon: <Gavel size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-40 border-b border-gray-100 p-4 flex justify-between items-center shadow-sm">
        <h1 onClick={() => navigate(`/`)} className="text-xl cursor-pointer font-bold tracking-tighter text-black">
          Admin<span className="text-orange-500">Panel</span>
        </h1>
        <button onClick={() => setIsOpen(true)} className="text-gray-600 hover:text-orange-500">
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 shadow-sm z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:inset-auto
      `}>

        <div onClick={() => navigate('/')} className="p-6 border-b cursor-pointer border-gray-100 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-black">
              Admin<span className="text-orange-500">Panel</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Head Librarian</p>
          </div>

          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)} // Close sidebar when link is clicked on mobile
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-semibold">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;