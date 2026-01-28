import { useState, useEffect } from 'react';
import StoryItem from './StoryItem';
import { fetchTopStories, fetchNewStories } from '../services/api';

const StoryList = ({ filter = 'top', onCommentClick }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadStories(0);
  }, [filter]);

  const loadStories = async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchFunction = filter === 'new' ? fetchNewStories : fetchTopStories;
      const data = await fetchFunction(pageNum);
      
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
      loadStories(page + 1);
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <StoryItem key={story.objectID || index} story={story} onCommentClick={onCommentClick} />
      ))}
      
      {loading && <div className="loading">Loading...</div>}
      
      {!loading && hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      
      {!loading && !hasMore && stories.length > 0 && (
        <div className="end-message">No more stories to load</div>
      )}
    </div>
  );
};

export default StoryList;
