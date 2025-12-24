import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/Books'
import BookDetailsPage from './pages/BookDetailsPage';
import Requests from './pages/Requests';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </Router>
  )
}

export default App