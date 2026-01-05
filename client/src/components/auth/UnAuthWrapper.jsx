import { Navigate, Outlet } from 'react-router-dom';

const UnAuthWrapper = ({ children }) => {
  const token = localStorage.getItem('BookSwap_Token');

  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children ? children : <Outlet />;
};

export default UnAuthWrapper;