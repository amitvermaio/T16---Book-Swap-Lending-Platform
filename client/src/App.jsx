import { useEffect, Suspense } from 'react';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { socket } from './socket';
import { asyncloaduser } from './store/actions/usersAction';

import AuthWrapper from './components/auth/AuthWrapper';
import UnAuthWrapper from './components/auth/UnAuthWrapper';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Books = lazy(() => import('./pages/Books'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Requests = lazy(() => import('./pages/Requests'));
const Tracking = lazy(() => import('./pages/Tracking'));
const About = lazy(() => import('./pages/About'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
const AddBookForm = lazy(() => import('./pages/AddBookForm'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const BooksAdmin = lazy(() => import('./pages/admin/Books'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Disputes = lazy(() => import('./pages/admin/Disputes'));

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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/requests" element={
            <AuthWrapper>
              <Requests />
            </AuthWrapper>
          } />
          <Route path="/tracking" element={
            <AuthWrapper>
              <Tracking />
            </AuthWrapper>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/add-book" element={
            <AuthWrapper>
              <AddBookForm />
            </AuthWrapper>
          } />
          <Route path="/profile/:userId" element={
            <AuthWrapper>
              <UserProfile />
            </AuthWrapper>
          } />
          <Route path="/settings" element={
            <AuthWrapper>
              <Settings />
            </AuthWrapper>
          } />

          {/* Auth routes */}
          <Route path='/sign-up' element={
            <UnAuthWrapper>
              <Register />
            </UnAuthWrapper>
          }
          />

          <Route path='/sign-in' element={
            <UnAuthWrapper>
              <Login />
            </UnAuthWrapper>
          }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AuthWrapper>
              <AdminLayout />
            </AuthWrapper>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="books" element={<BooksAdmin />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;