// AdminLayout.jsx
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - automatically handles its own width and responsiveness */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pt-16 md:pt-0">
        <main className="flex-1 p-6">
           <Outlet /> {/* Yahan aapke pages render honge */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;