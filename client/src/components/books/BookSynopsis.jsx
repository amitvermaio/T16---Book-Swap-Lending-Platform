const BookSynopsis = ({ description }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
      <p className="text-gray-600 leading-relaxed">
        {description || "No description available."}
      </p>
    </div>
  );
};

export default BookSynopsis;
