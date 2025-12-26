import { useEffect } from "react";
import ZeroToOne from "../../assets/ZeroToOne.jpg";

const RelatedBooks = ({ related }) => {
  if (related.length === 0) return null;

  useEffect(() => {
    console.log(related)
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">
        You might also like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((book) => (
          <div
            key={book._id}
            className="h-60 rounded-xl overflow-hidden bg-gray-100"
          >
            <img
              src={
                book.images?.length
                  ? book.images[0]
                  : ZeroToOne
              }
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
