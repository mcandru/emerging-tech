import { useState } from 'react';
import { searchStories } from '../services/api';
import StoryItem from './StoryItem';

const Search = ({ onCommentClick }) => {
  const [query, setQuery] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (e, pageNum = 0) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const data = await searchStories(query, pageNum);
      
      if (pageNum === 0) {
        setStories(data.hits);
      } else {
        setStories(prev => [...prev, ...data.hits]);
      }
      
      setHasMore(data.nbPages > pageNum + 1);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      handleSearch(null, page + 1);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Hacker News..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      <div className="story-list">
        {stories.map((story, index) => (
          <StoryItem key={story.objectID || index} story={story} onCommentClick={onCommentClick} />
        ))}
        
        {loading && <div className="loading">Loading...</div>}
        
        {!loading && hasMore && stories.length > 0 && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
