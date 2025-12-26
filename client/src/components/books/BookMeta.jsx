const BookMeta = ({ book }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border rounded-xl p-6">
      <Meta label="Type" value={book.availabilityType} />
      <Meta label="Status" value={book.status} />
      <Meta label="City" value={book.location?.city} />
      <Meta label="Country" value={book.location?.country} />
    </div>
  );
};

const Meta = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default BookMeta;
