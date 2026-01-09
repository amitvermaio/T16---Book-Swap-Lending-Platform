import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const UnAuthWrapper = ({ children }) => {
  const { isAuthorized } = useSelector((state) => state.users);

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }
  
  return children ? children : <Outlet />;
};

export default UnAuthWrapper;