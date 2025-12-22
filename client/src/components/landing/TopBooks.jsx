import Slider from "react-slick";

import TheSubtleArt from "../../assets/TheSubtleArt.webp";
import ZeroToOne from "../../assets/ZeroToOne.jpg";
import TheForeverWar from "../../assets/TheForeverWar.jpg";
import ElonMusk from "../../assets/ElonMusk.webp";


const books = [TheForeverWar, TheSubtleArt, ElonMusk, ZeroToOne];

export const bookGenres = [ "Fiction","Non-Fiction", "Fantasy", "Science Fiction", "Romance",
  "Mystery", "Thriller", "Horror", "Historical", "Biography", "Autobiography", "Self-Help", 
  "Philosophy", "Poetry", "Adventure", "Comics","Young Adult", "Children", "Religion", 
  "Spirituality", "Science", "Technology", "Business", "Economics", "Politics", "Health", 
  "Travel", "Cooking", "Art", "Education" ];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
};

const TopBooks = () => {
  return (
    <div className='mt-30 roboto tracking-wider h-full'>
      <div>
        <h1 className='text-5xl font-semibold'>Trending Books</h1>
      </div>
      
      <div className="scroll-container flex overflow-x-auto gap-4 scrollbar-hide whitespace-nowrap mt-5">
        {bookGenres.map((g) => (
          <button key={g} className="px-4 py-2 text-md rounded-full scroll-item text-black transition tracking-tighter uppercase">
            {g}
          </button>
        ))}
      </div>  

      <div className='w-full h-full flex mt-10 gap-10'>
        {books.map((book, i) => (
          <div key={i} className="px-3">
            <div className='h-[20rem] w-full bg-red-400 rounded-xl overflow-hidden'>
              <img className='w-full h-full object-cover' src={book} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBooks