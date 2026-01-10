import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { asyncloadbooks } from "../store/actions/booksAction";

import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import SearchFilterBar from "../components/SearchFilterBar";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Books = () => {
  const dispatch = useDispatch();

  const { books, hasMore, loading } = useSelector((state) => state.books);
  const users = useSelector((state) => state.users);
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 180);

  useEffect(() => {
    const calculateHeight = () => {
      const offset = window.innerWidth < 768 ? 320 : 180;
      setScrollHeight(window.innerHeight - offset);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(asyncloadbooks());
    }
  }, [dispatch, books.length]);

  const fetchMoreBooks = () => {
    if (!loading && hasMore) {
      console.log("Fetching next page...");
      dispatch(asyncloadbooks());
    }
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-12 bg-white pb-10 overflow-hidden">
      <Navbar />

      <div className="w-full mt-5">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tighter font-semibold">
              All Books
            </h1>

            <p className="tracking-wider text-orange-500 flex items-center flex-wrap gap-2 mt-2 text-sm sm:text-base">
              Discover books shared by readers near you
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="tracking-wide font-bold text-black">
                1,250+ books available.
              </span>
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Link
              to={users?.isAuthorized ? '/add-book' : '/sign-in'}
              className="
                group flex items-center justify-center md:justify-start gap-2 
                w-full md:w-auto
                bg-orange-500 hover:bg-orange-600 text-white 
                px-5 py-3 md:px-4 md:py-2.5 rounded-xl 
                font-semibold text-sm transition-all duration-200 
                shadow-md hover:shadow-lg active:scale-95 tracking-tighter
              "
            >
              <Plus
                size={18}
                strokeWidth={3}
                className="group-hover:rotate-90 transition-transform duration-200"
              />
              <span>Add Book</span>
            </Link>
          </div>
        </div>

        <SearchFilterBar />

        <InfiniteScroll
          className="hide-scrollbar"
          dataLength={books.length}
          next={fetchMoreBooks}
          hasMore={hasMore}
          height={scrollHeight}
          loader={
            <p className="text-center py-6 text-gray-400">
              Loading more books...
            </p>
          }
          endMessage={
            <p className="text-center py-6 text-gray-400">
              🎉 You’ve reached the end
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book._id} className="flex justify-center">
                  <BookCard {...book} />
                </div>
              ))
            ) : (
              (books.length === 0 && !loading) ? (
                <p className="col-span-full w-full h-40 flex items-center justify-center text-gray-500">No books found.</p>
              ) : (
                <div className="col-span-full w-full h-40 flex items-center justify-center text-gray-400">
                  Loading library...
                </div>
              )
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Books;