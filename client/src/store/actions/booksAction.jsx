import axios from '../../config/axiosconfig';
import { setloading, loadbooks, setcurrentbook, setcurrentbookloading, setbookfavorite } from '../features/bookSlice';

export const asyncloadbooks = () => async (dispatch, getState) => {
  try {
    const { currentPage, hasMore, loading } = getState().books;
    if (!hasMore || loading) return;

    dispatch(setloading(true));

    const { data } = await axios.get(`/books?page=${currentPage}&limit=8`);

    dispatch(loadbooks({
      books: data.books,
      page: currentPage + 1,
      hasMore: data.pagination.hasMore
    }));

    dispatch(setloading(false));

  } catch (error) {
    console.log(error);
  }
} 

export const asyncloadcurrentbook = (id) => async (dispatch) => {
  try {
    dispatch(setcurrentbookloading(true));

    const { data } = await axios.get(`/books/${id}`);
    dispatch(setcurrentbook(data));
  } catch (error) {
    console.error("Failed to load book", error);
  } finally {
    dispatch(setcurrentbookloading(false));
  }
};


export const asyncaddbooktofavorites = (userId, bookId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/users/favourites`, { userId, bookId });
    console.log(data);
    if (data.success) {
      dispatch(setbookfavorite(bookId));
    }
  } catch (error) {
    console.error("Failed to add in Favorites", error);
  } 
} 