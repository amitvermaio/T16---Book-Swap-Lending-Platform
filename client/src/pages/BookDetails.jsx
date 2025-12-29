import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadcurrentbook } from '../store/actions/booksAction';

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import BookHero from '../components/books/BookHero';
import BookInfo from '../components/books/BookInfo';
import RelatedBooks from '../components/books/RelatedBooks';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bookDetails, loadingCurrentBook } = useSelector(state => state.books);
  const { book, related } = bookDetails;

  useEffect(() => {
    if (id) {
      dispatch(asyncloadcurrentbook(id));
    }
  }, [dispatch, id]);

  if (!book || loadingCurrentBook) {
    return (
      <Loader fullScreen={true} />
    );
  }

  const allImages = [book.coverImageUrl, ...(book.additionalImages || [])];

  return (
    <div className="w-full min-h-screen px-4 lg:px-12 selection:bg-orange-100 selection:text-orange-900 bg-[#f8f5f0] pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto mt-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5">
            <BookHero images={allImages} />
          </div>

          <div className="lg:col-span-7">
            <BookInfo book={book} />
          </div>
        </div>

        {related && related.length > 0 && (
          <div>
            <RelatedBooks books={related} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;