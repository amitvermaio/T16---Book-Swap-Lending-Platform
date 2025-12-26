const BookTags = ({ genres = [], tags = [] }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((g, i) => (
        <span
          key={i}
          className="px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium"
        >
          {g}
        </span>
      ))}

      {tags.map((t, i) => (
        <span
          key={i}
          className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
        >
          {t}
        </span>
      ))}
    </div>
  );
};

export default BookTags;
