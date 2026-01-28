import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoryById } from '../services/api';
import Comment from './Comment';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStoryById(id);
      setStory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getDomain = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return <div className="loading">Loading story...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">Error: {error}</div>
        <button onClick={handleBack} className="back-button">Go Back</button>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="error-container">
        <div className="error">Story not found</div>
        <button onClick={handleBack} className="back-button">Go Back</button>
      </div>
    );
  }

  return (
    <div className="story-detail">
      <button onClick={handleBack} className="back-button">← Back</button>
      
      <div className="story-detail-header">
        <div className="story-detail-title">
          {story.url ? (
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
          ) : (
            <h2>{story.title}</h2>
          )}
          {story.url && (
            <span className="story-domain"> ({getDomain(story.url)})</span>
          )}
        </div>
        <div className="story-detail-metadata">
          <span className="story-points">{story.points || 0} points</span>
          <span className="story-separator"> | </span>
          <span className="story-author">by {story.author}</span>
          <span className="story-separator"> | </span>
          <span className="story-time">{formatDate(story.created_at)}</span>
        </div>
        
        {story.text && (
          <div 
            className="story-detail-text"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        )}
      </div>

      <div className="comments-section">
        <h3 className="comments-header">
          {story.children?.length || 0} comments
        </h3>
        {story.children && story.children.length > 0 ? (
          story.children.map((comment, index) => (
            <Comment key={comment.id || index} comment={comment} level={0} />
          ))
        ) : (
          <div className="no-comments">No comments yet.</div>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
