import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axiosconfig'; 
import { loaduser } from '../../store/features/userSlice';
import { Loader2 } from 'lucide-react';

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.users);
  const [verifying, setVerifying] = useState(!isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      setVerifying(false);
      return;
    }

    const verifyUser = async () => {
      const token = localStorage.getItem('BookSwap_Token');
      
      if (!token) {
        setVerifying(false);
        return;
      }

      try {
        const { data } = await axios.get('/auth/me'); 
        
        dispatch(loaduser(data.user));
      } catch (error) {
        console.log("Session expired:", error);
        localStorage.removeItem('BookSwap_Token');
      } finally {
        setVerifying(false);
      }
    };

    verifyUser();
  }, [dispatch]); 

  if (verifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default AuthWrapper;