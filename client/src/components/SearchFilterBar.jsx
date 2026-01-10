import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ChevronDown, X, MapPin, Check, RotateCcw } from 'lucide-react';
import {
  setSearchTerm,
  setFilter,
  setLocation,
  clearLocation as clearLocationAction,
  setSort,
  resetFilters,
} from '../store/features/filtersSlice';
import { asyncloadbooks } from '../store/actions/booksAction';
import { resetbooks } from '../store/features/bookSlice';
import { CONDITIONS, AVAILABILITY, SORT_OPTIONS, bookGenres as BOOK_GENRES } from "../utils/constants";

const SearchFilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { isAuthorized } = useSelector(state => state.users);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [locationSearch, setLocationSearch] = useState("");
  const dropdownRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      dispatch(resetbooks());
      dispatch(asyncloadbooks());
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSelect = (category, value) => {
    if (category === 'sort') {
      dispatch(setSort(value));
      setActiveDropdown(null);
      return;
    }

    if (category === 'location') {
      dispatch(setLocation(value));
      setActiveDropdown(null);
      return;
    }

    dispatch(setFilter({ category, value }));
    setActiveDropdown(null);
  };

  const handleClearLocation = (e) => {
    e.stopPropagation();
    dispatch(clearLocationAction());
    setLocationSearch("");
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearAll = () => {
    dispatch(resetFilters());
    setLocationSearch("");
    setActiveDropdown(null);
  };

  return (
    <div className="w-full mt-2 sm:mt-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 font-sans" ref={dropdownRef}>

      {/* Main Search Bar */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title, author, or ISBN"
          className="w-full bg-[#FDFBF7] hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-100 border border-orange-200 outline-none rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-orange-300 text-sm transition-all shadow-inner-sm"
        />
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative">

        <div className="flex flex-wrap items-center gap-2">

          {/* Filters Mapped */}
          {[
            { label: 'Genre', key: 'genre', options: BOOK_GENRES },
            { label: 'Condition', key: 'condition', options: CONDITIONS },
            { label: 'Availability', key: 'availabilityType', options: AVAILABILITY },
          ].map((filter) => {
            // Access state directly (single string)
            const currentSelection = filters[filter.key];
            const isSelected = !!currentSelection; // Check if string is not empty

            return (
              <div key={filter.key} className="relative">
                <button
                  onClick={() => toggleDropdown(filter.key)}
                  className={`group flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all border
                    ${isSelected || activeDropdown === filter.key
                      ? 'bg-orange-100 border-orange-200 text-orange-600'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-100 text-black'}`}
                >
                  {isSelected ? currentSelection : filter.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === filter.key ? 'rotate-180' : ''} 
                    ${isSelected ? 'text-orange-400' : 'text-black'}`}
                  />
                </button>

                {activeDropdown === filter.key && (
                  <div className="absolute top-full mt-2 left-0 w-48 max-h-64 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(filter.key, option)}
                        className="w-full text-left px-3 capitalize py-2 text-sm text-gray-900 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors flex items-center justify-between"
                      >
                        {option}
                        {/* Check exact match for single select */}
                        {currentSelection === option && <Check size={14} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Location Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('location')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all border
                ${filters.location
                  ? 'bg-orange-50 border-orange-100 text-orange-600'
                  : 'bg-[#FCFCFC] border-transparent hover:bg-gray-100 text-gray-900'}`}
            >
              Location: <span className={filters.location ? "text-orange-600" : "text-gray-900"}>{filters.location || "Any"}</span>
              {filters.location ? (
                <X size={14} className="ml-1 cursor-pointer hover:text-orange-800" onClick={handleClearLocation} />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>

            {activeDropdown === 'location' && (
              <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-3">
                <div className="relative mb-3">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter city or zip..."
                    className="w-full bg-gray-50 text-sm pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 text-gray-900"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelect('location', locationSearch);
                    }}
                  />
                </div>

                {isAuthorized && (
                  <>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-1">Quick Select</div>
                    <button
                      onClick={() => handleSelect('location', 'Nearby')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-orange-50 hover:text-orange-600 rounded-lg flex items-center gap-2"
                    >
                      <MapPin size={14} /> Nearby Books
                      {filters.location === 'Nearby' && <Check size={14} className="text-orange-500 ml-auto" />}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors ml-2"
            title="Reset all filters"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>

        {/* Sort Options */}
        <div className="relative flex items-center gap-2 ml-auto sm:ml-0 border-l pl-4 border-gray-100">
          <span className="text-gray-400 text-sm font-normal hidden sm:inline-block">Sort by:</span>
          <button
            onClick={() => toggleDropdown('sort')}
            className="flex items-center gap-1 text-gray-900 text-sm font-semibold hover:text-black group"
          >
            {filters.sort}
            <ChevronDown size={16} className={`text-gray-900 stroke-[3px] transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'sort' && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect('sort', option)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between
                    ${filters.sort === option ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-900 hover:bg-gray-50'}`}
                >
                  {option}
                  {filters.sort === option && <Check size={14} className="text-orange-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchFilterBar;