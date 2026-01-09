import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <BookX size={48} className="text-orange-600" strokeWidth={1.5} />
      </div>

      <h1 className="text-6xl font-bold text-gray-900 mb-2 tracking-tighter">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        Oops! It looks like this book is missing from our shelf. The page you are looking for might have been removed or doesn't exist.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2 
          bg-black hover:bg-gray-800 text-white 
          px-8 py-3 rounded-xl 
          font-semibold text-sm transition-all duration-200 
          shadow-lg hover:shadow-xl active:scale-95
        "
      >
        <ArrowLeft size={18} />
        Go Back
      </button>

    </div>
  );
};

export default NotFound;