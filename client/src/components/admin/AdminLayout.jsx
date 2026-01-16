import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncfetchusers, asyncfetchbooks } from '../../store/actions/adminActions';
import { useEffect } from 'react';

const AdminLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncfetchusers());
    dispatch(asyncfetchbooks());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto pt-16 md:pt-0">
        <main className="flex-1 p-6">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;