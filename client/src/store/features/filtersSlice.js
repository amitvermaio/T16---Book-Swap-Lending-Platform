import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: "",
  genre: [],
  condition: [],
  type: [],
  availability: [],
  location: "Nearby",
  sort: "Newest First"
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilter: (state, action) => {
      const { category, value } = action.payload;
      // If we want single select for filters, we replace the array. 
      // If you want multi-select later, you can push/filter here.
      // Based on previous code, it behaves as single select per category:
      state[category] = [value]; 
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = null;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const { setSearchTerm, setFilter, setLocation, clearLocation, setSort, resetFilters } = filtersSlice.actions;
export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;