import { useNavigate } from "react-router-dom";

import { bookGenres } from "../../utils/constants.jsx";
import LandingBookCard from "./LandingBookCard";


const TopBooks = () => {

  const navigate = useNavigate();

  return (
    <div className='sm:mt-30 roboto tracking-wider h-full'>
      <div>
        <h1 className='text-5xl font-semibold'>Trending Books</h1>
      </div>

      <div className="genre-carousel mt-5">
        <div className="genre-track">

          {/* FIRST COPY */}
          <div className="genre-group">
            {bookGenres.map((g, i) => (
              <button
                key={`a-${i}`}
                onClick={() => {navigate(`/books?genre=${g.toLowerCase()}`)}}
                className="scroll-item px-4 py-2 text-md text-black tracking-tighter uppercase whitespace-nowrap hover:underline"
              >
                {g}
              </button>
            ))}
          </div>

          {/* DUPLICATE COPY */}
          <div className="genre-group" aria-hidden>
            {bookGenres.map((g, i) => (
              <button
                key={`b-${i}`}
                className="scroll-item px-4 py-2 text-md rounded-full text-black tracking-tighter uppercase whitespace-nowrap"
              >
                {g}
              </button>
            ))}
          </div>

        </div>
      </div>


      <div className='carousel'>
        <div className="group-books">
          <LandingBookCard />
        </div>

        <div aria-hidden className="group-books">
          <LandingBookCard />
        </div>
      </div>
    </div>
  )
}

export default TopBooks