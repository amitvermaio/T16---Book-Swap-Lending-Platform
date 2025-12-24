import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { asyncloadbooks } from "../store/actions/booksAction";

import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import SearchFilterBar from "../components/SearchFilterBar";

const Books = () => {
  const dispatch = useDispatch();

  const { books, hasMore, loading } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(asyncloadbooks());
    }
  }, []);

  const fetchMoreBooks = () => {
    if (!loading && hasMore) {
      console.log("📚 Fetching next page...");
      dispatch(asyncloadbooks());
    }
  };

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white pb-10">
      <Navbar />

      <div className="w-full mt-5">
        {/* Header */}
        <div>
          <h1 className="text-5xl tracking-tighter font-semibold">
            All Books
          </h1>

          <p className="tracking-wider text-orange-500 flex items-center gap-2 mt-2">
            Discover books shared by readers near you
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="tracking-wide font-bold text-black">
              1,250+ books available.
            </span>
          </p>
        </div>

        {/* Search & Filters */}
        <SearchFilterBar />

        {/* ✅ Infinite Scroll */}
        <InfiniteScroll
          className="hide-scrollbar"
          dataLength={books.length}   
          next={fetchMoreBooks}       
          hasMore={hasMore}
          height={window.innerHeight - 180} 
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
          <div className="flex flex-wrap gap-6 justify-start py-8">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  {...book}
                />
              ))
            ) : (
              <div className="w-full h-40 flex items-center justify-center text-gray-400">
                Loading library...
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Books;
