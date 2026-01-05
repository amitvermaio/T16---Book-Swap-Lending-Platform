import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loaduser, setauthentication } from '../../store/features/userSlice';
import axios from '../../config/axiosconfig';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.users);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('BookSwap_Token');

      if (!token) {
        if (isMounted) {
          dispatch(setauthentication(false));
          setIsCheckingAuth(false);
        }
        navigate('/sign-in', { replace: true });
        return;
      }

      try {
        const res = await axios.get('/auth/me');

        if (isMounted) {
          dispatch(loaduser(res.data.user));
        }
      } catch (error) {
        localStorage.removeItem('BookSwap_Token');
        if (isMounted) {
          dispatch(setauthentication(false));
          setIsCheckingAuth(false);
        }
        navigate('/sign-in', { replace: true });
        return;
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, dispatch]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>
}

export default AuthWrapper