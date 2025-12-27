import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { asyncloaduser } from './store/actions/usersAction';

import AuthWrapper from './components/auth/AuthWrapper';
import UnAuthWrapper from './components/auth/UnAuthWrapper';

import Home from './pages/Home';
import Books from './pages/Books'
import BookDetailsPage from './pages/BookDetailsPage';
import Requests from './pages/Requests';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AddBookForm from './pages/AddBookForm';
import UserProfile from './pages/UserProfile';

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    const token = localStorage.getItem("BookSwap_Token");
    
    if (token && !user.isAuthorized) {
      dispatch(asyncloaduser());
    }
  }, [dispatch, user.isAuthorized]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/add-book" element={<AddBookForm />} />

        <Route path="/profile" element={<UserProfile />} />

        {/* Auth routes */}
        <Route path='/sign-up' element={
          <UnAuthWrapper>
            <Register />
          </UnAuthWrapper>} 
        />

        <Route path='/sign-in' element={
          <UnAuthWrapper>
            <Login />
          </UnAuthWrapper>} 
        />
        
      </Routes>
    </Router>
  )
}

export default App