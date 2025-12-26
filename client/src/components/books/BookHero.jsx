const BookHero = ({ images = [] }) => {
  const cover = images?.[0] || "/placeholder.jpg";

  return (
    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-gray-200">

      {/* BLURRED BG */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60"
        style={{ backgroundImage: `url(${cover})` }}
      />

      {/* MAIN IMAGE */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img
          src={cover}
          alt="Book Cover"
          className="h-[85%] object-contain drop-shadow-2xl"
        />
      </div>

      {/* SLIDER BUTTONS (static for now) */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full">
        ←
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full">
        →
      </button>
    </div>
  );
};

export default BookHero;
