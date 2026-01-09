import axios from '../../config/axiosconfig';
import { 
  setloading, 
  loadbooks, 
  setcurrentbook, 
  setcurrentbookloading, 
  setbookfavorite, 
} from '../features/bookSlice';

export const asyncloadbooks = () => async (dispatch, getState) => {
  try {
    const { currentPage, hasMore, loading } = getState().books;
    const { searchTerm, genre, condition, availabilityType, location, sort } = getState().filters;

    if (!hasMore || loading) return;

    dispatch(setloading(true));

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 8,
      sort,
    });
    
    if (searchTerm) queryParams.append('search', searchTerm);
    if (genre) queryParams.append('genre', genre);
    if (condition) queryParams.append('condition', condition);
    if (availabilityType) queryParams.append('availabilityType', availabilityType);
    if (location) queryParams.append('location', location);

    const { data } = await axios.get(`/books?${queryParams.toString()}`);

    dispatch(loadbooks({
      books: data.books,
      page: currentPage + 1,
      hasMore: data.pagination.hasMore
    }));

  } catch (error) {
    console.log(error);
    dispatch(setloading(false));
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
    if (data.success) {
      dispatch(setbookfavorite(bookId));
    }
  } catch (error) {
    console.error("Failed to add in Favorites", error);
  } 
}