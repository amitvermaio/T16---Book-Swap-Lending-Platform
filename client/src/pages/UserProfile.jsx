import { useState, useEffect } from "react";
import { ArrowLeft, Loader2, Share2, MoreHorizontal } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserBooksList from "../components/profile/UserBooksList";

const MOCK_USER = {
  _id: "u123",
  name: "Amit Verma",
  email: "amit.verma@example.com",
  role: "user",
  address: "B-21, Lanka",
  city: "Varanasi",
  state: "Uttar Pradesh",
  pincode: 221005,
  ratingStats: { avgRating: 4.8, totalRatings: 42 },
  lendingPreferences: { onlyLocal: false, visibility: "all" },
  createdAt: "2023-08-15T10:00:00Z",
  about: " avid reader and tech enthusiast. Love collecting rare sci-fi editions. Open to swapping anything from my shelf!",
};

const MOCK_BOOKS = [
  {
    _id: "b1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImageUrl: "https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg",
    availabilityType: ["swap"],
    genre: ["Finance", "Self-Help"]
  },
  {
    _id: "b2",
    title: "Dune",
    author: "Frank Herbert",
    coverImageUrl: "https://images-na.ssl-images-amazon.com/images/I/9158ofE+gSL.jpg",
    availabilityType: ["lend", "swap"],
    genre: ["Sci-Fi", "Classic"]
  },
  {
    _id: "b3",
    title: "Atomic Habits",
    author: "James Clear",
    coverImageUrl: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    availabilityType: ["donate"],
    genre: ["Self-Help"]
  },
  {
    _id: "b4",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    coverImageUrl: "https://m.media-amazon.com/images/I/71sVl936JpL._AC_UF1000,1000_QL80_.jpg",
    availabilityType: ["swap"],
    genre: ["Biography"]
  }
];

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUser(MOCK_USER);
      setBooks(MOCK_BOOKS);
      setLoading(false);
    }, 800);
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (!user) return <div className="text-center mt-20">User not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. COVER PHOTO BANNER */}
      {/* Uses a mesh gradient for a modern look */}
      <div className="h-40 w-full bg-gradient-to-r from-slate-900 via-gray-800 to-black relative">
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        
        {/* Optional: Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 -mt-20 relative z-10">
          
          {/* 2. LEFT COLUMN: PROFILE CARD */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <ProfileHeader user={user} bookCount={books.length} />
          </div>

          {/* 3. RIGHT COLUMN: BOOKS GRID */}
          <div className="flex-1 mt-6 lg:mt-20">
            <UserBooksList books={books} userName={user.name} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;