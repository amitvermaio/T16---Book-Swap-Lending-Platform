

import { books } from "../../utils/constants";


const LandingBookCard = () => {
  return (
    <>
      {books.map((book, i) => (
        <div
          key={i}
          className="card bg-white rounded-xl overflow-hidden"
        >
          
          <div className="h-[20rem] w-full overflow-hidden">
            <img
              src={book.image}
              alt="Book cover"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-3 py-2 flex flex-col gap-1">
            <p className="text-sm font-semibold tracking-tight">
              {book.author}
            </p>

            <p className="text-xs text-gray-500">
              Owned by <span className="font-medium">{book.owner}</span>
            </p>

            <span
              className={`w-fit text-[10px] px-2 py-[2px] rounded-full tracking-wider
                ${
                  book.purpose === "SWAP"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {book.purpose}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default LandingBookCard;
