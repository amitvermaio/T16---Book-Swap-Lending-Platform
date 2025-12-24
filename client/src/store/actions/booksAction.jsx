import axios from '../../config/axiosconfig';
import { setloading, loadbooks } from '../features/bookSlice';

export const asyncloadbooks = (pageNo) => async (dispatch, getState) => {
  try {
    const { currentPage, hasMore, loading } = getState().books;
    console.log("Call aya for " + currentPage);

    if (!hasMore || loading) return;

    dispatch(setloading(true));

    console.log("Call aya for page:", currentPage);

    const { data } = await axios.get(`/books?page=${currentPage}&limit=8`);

    console.log(data);
    console.log(data.pagination.hasMore);

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