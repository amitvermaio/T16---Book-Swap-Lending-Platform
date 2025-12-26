import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { asyncloadcurrentbook } from "../store/actions/booksAction";

import Navbar from "../components/Navbar";
import BookHero from "../components/books/BookHero";
import BookHeader from "../components/books/BookHeader";
import BookTags from "../components/books/BookTags";
import BookSynopsis from "../components/books/BookSynopsis";
import BookMeta from "../components/books/BookMeta";
import BookOwnerCard from "../components/books/BookOwnerCard";
import RelatedBooks from "../components/books/RelatedBooks";
import DoItToday from "../assets/DoItToday.jpg";


const BookDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bookDetails, loadingCurrentBook } = useSelector(
    (state) => state.books
  );

  const { book, related } = bookDetails;

  useEffect(() => {
    if (id) {
      dispatch(asyncloadcurrentbook(id));
    }
  }, [id]);

  if (loadingCurrentBook || !book) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  return (
    <div className="w-screen min-h-screen px-6 lg:px-12 bg-white pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto pb-20">
        <div className="mt-6">
          <BookHero
            images={ book.images?.length ? currentBook.images : [DoItToday] }/>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">

          <div className="space-y-10">
            <BookHeader book={book} />
            <BookTags genres={book.genre} tags={book.tags} />
            <BookSynopsis description={book.description} />
            <BookMeta book={book} />
          </div>

          <div className="sticky top-24 space-y-6">
            <BookOwnerCard id={id} book={book} />
          </div>
        </div>

        <div className="mt-20">
          <RelatedBooks related={related} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
