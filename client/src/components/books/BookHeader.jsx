import { Star } from "lucide-react";

const BookHeader = ({ book }) => {
  return (
    <div className="space-y-3">

      {/* TITLE */}
      <h1 className="
        text-3xl sm:text-4xl lg:text-5xl
        font-semibold
        tracking-tight
        leading-tight
        text-gray-900
      ">
        {book.title}
      </h1>

      {/* META */}
      <div className="flex flex-wrap items-center gap-4 text-sm">

        {/* AUTHOR */}
        <p className="text-gray-500">
          Written by{" "}
          <span className="text-orange-500 font-medium hover:underline cursor-pointer">
            {book.author}
          </span>
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">
          <Star size={14} fill="currentColor" />
          <span className="font-semibold">4.9</span>
          <span className="text-yellow-500/70 text-xs">
            (12k reviews)
          </span>
        </div>

      </div>
    </div>
  );
};

export default BookHeader;
