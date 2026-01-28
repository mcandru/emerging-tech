import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, searchQuery, filter, onFilterChange }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Hacker News..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'search' ? 'active' : ''}`}
          onClick={() => onFilterChange('search')}
        >
          By Popularity
        </button>
        <button 
          className={`filter-btn ${filter === 'search_by_date' ? 'active' : ''}`}
          onClick={() => onFilterChange('search_by_date')}
        >
          By Date
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
