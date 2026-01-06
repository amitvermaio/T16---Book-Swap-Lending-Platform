import { Link } from 'react-router-dom';

const RelatedBooks = ({ books }) => {
  if (!books) return null;
  const displayBooks = books.slice(0, 4);

  return (
    <div className="space-y-6 font-jakarta pb-10">
      <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">
        Related Books
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayBooks.map((book) => (
          <Link to={`/books/${book._id}`} key={book._id}>
            <div className="group relative bg-white rounded-2xl overflow-hidden h-72 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <img 
                src={book.coverImageUrl} 
                alt={book.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-semibold text-sm line-clamp-2">
                    {book.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;