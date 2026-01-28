const StoryItem = ({ story, onCommentClick }) => {
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

  const getDomain = (url) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  return (
    <div className="story-item">
      <div className="story-title">
        {story.url ? (
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
        ) : (
          <span>{story.title}</span>
        )}
        {story.url && (
          <span className="story-domain"> ({getDomain(story.url)})</span>
        )}
      </div>
      <div className="story-metadata">
        <span className="story-points">{story.points || 0} points</span>
        <span className="story-separator"> | </span>
        <span className="story-author">by {story.author}</span>
        <span className="story-separator"> | </span>
        <span className="story-time">{formatDate(story.created_at)}</span>
        <span className="story-separator"> | </span>
        <button
          onClick={() => onCommentClick(story.objectID)}
          className="story-comments-link"
        >
          {story.num_comments || 0} comments
        </button>
      </div>
    </div>
  );
};

export default StoryItem;
