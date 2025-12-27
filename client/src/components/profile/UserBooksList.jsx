import { BookOpen, ArrowUpRight } from "lucide-react";

const UserBooksList = ({ books, userName }) => {
  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="text-gray-400" size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Shelf is empty</h3>
        <p className="text-gray-500 mt-2 text-sm">{userName} hasn't listed any books yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900">Books Shelf</h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">
            {books.length} Items
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10">
        {books.map((book) => (
          <div key={book._id} className="group cursor-pointer">
            
            {/* Image Wrapper with Interaction */}
            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <img 
                src={book.coverImageUrl} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <button className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2">
                    View Details <ArrowUpRight size={16} />
                 </button>
              </div>

              {/* Availability Badges (Top Left) */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {book.availabilityType.map((type) => (
                  <span 
                    key={type} 
                    className={`
                      px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-sm border border-white/20
                      ${type === 'swap' ? 'bg-orange-500/90 text-white' : ''}
                      ${type === 'lend' ? 'bg-blue-600/90 text-white' : ''}
                      ${type === 'donate' ? 'bg-emerald-500/90 text-white' : ''}
                    `}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Info */}
            <div className="mt-4 space-y-1">
              <h4 className="font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                {book.title}
              </h4>
              <p className="text-sm text-gray-500">{book.author}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {book.genre.slice(0, 2).map((g) => (
                  <span key={g} className="text-[10px] font-medium bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBooksList;