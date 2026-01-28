import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import StoryList from './components/StoryList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const ALGOLIA_API_BASE = 'https://hn.algolia.com/api/v1';

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [nbPages, setNbPages] = useState(0);
  const [filter, setFilter] = useState('search');

  useEffect(() => {
    fetchStories();
  }, [searchQuery, currentPage, filter]);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = searchQuery 
        ? `${ALGOLIA_API_BASE}/${filter}?query=${encodeURIComponent(searchQuery)}&page=${currentPage}&hitsPerPage=30`
        : `${ALGOLIA_API_BASE}/search?tags=front_page&page=${currentPage}&hitsPerPage=30`;
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      
      const data = await response.json();
      setStories(data.hits);
      setNbPages(data.nbPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        filter={filter}
        onFilterChange={handleFilterChange}
      />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && (
        <>
          <StoryList stories={stories} />
          <Pagination 
            currentPage={currentPage}
            nbPages={nbPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
