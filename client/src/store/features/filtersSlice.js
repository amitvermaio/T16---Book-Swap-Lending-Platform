import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: "",
  genre: "",
  condition: "",
  availabilityType: "",
  location: "",
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
      // Exact single select behavior: replace the value directly
      // If the same value is clicked again, we can toggle it off (optional, but good UX)
      state[category] = state[category] === value ? "" : value;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = "";
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const {
  setSearchTerm,
  setFilter,
  setLocation,
  clearLocation,
  setSort,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;