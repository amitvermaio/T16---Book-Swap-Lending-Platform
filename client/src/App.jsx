import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthWrapper from './components/auth/AuthWrapper';
import UnAuthWrapper from './components/auth/UnAuthWrapper';

import Home from './pages/Home';
import Books from './pages/Books'
import BookDetailsPage from './pages/BookDetailsPage';
import Requests from './pages/Requests';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/requests" element={<Requests />} />

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