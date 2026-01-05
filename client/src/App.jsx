import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { socket } from './socket';
import { asyncloaduser } from './store/actions/usersAction';

import AuthWrapper from './components/auth/AuthWrapper';
import UnAuthWrapper from './components/auth/UnAuthWrapper';

import Home from './pages/Home';
import Books from './pages/Books'
import BookDetails from './pages/BookDetails';
import Requests from './pages/Requests';
import Tracking from './pages/Tracking';
import About from './pages/About';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AddBookForm from './pages/AddBookForm';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
// https://ui-avatars.com/api/?name=${owner?.name}

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    const token = localStorage.getItem("BookSwap_Token");

    if (token && !user.isAuthorized) {
      dispatch(asyncloaduser());
    }
  }, [dispatch, user.isAuthorized]);

  useEffect(() => {
    const token = localStorage.getItem('BookSwap_Token');

    if (token && user.isAuthorized) {
      socket.auth = { token };
      socket.connect();

      console.log('Socket Connecting...');

      socket.on('connect', () => {
        console.log('Socket Connected', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Socket Disconnected');
      });
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user.isAuthorized]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/settings" element={
          <AuthWrapper>
            <Settings />
          </AuthWrapper>
        } />

        {/* Auth routes */}
        <Route path='/sign-up' element={
          <UnAuthWrapper>
            <Register />
          </UnAuthWrapper>}
        />

        <Route path='/sign-in' element={
          <UnAuthWrapper>
            <Login />
          </UnAuthWrapper>
          }
        />

      </Routes>
    </Router>
  )
}

export default App