import React from 'react';
import './StoryItem.css';

function StoryItem({ story, rank }) {
  const getHostname = (url) => {
    if (!url) return '';
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [name, secondsInInterval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInInterval);
      if (interval >= 1) {
        return `${interval} ${name}${interval !== 1 ? 's' : ''} ago`;
      }
    }
    
    return 'just now';
  };

  const storyUrl = story.url || `https://news.ycombinator.com/item?id=${story.objectID}`;
  const commentsUrl = `https://news.ycombinator.com/item?id=${story.objectID}`;
  
  return (
    <li className="story-item">
      <div className="story-main">
        <span className="story-rank">{rank}.</span>
        <div className="story-content">
          <div className="story-title-row">
            <a 
              href={storyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-title"
            >
              {story.title}
            </a>
            {story.url && (
              <span className="story-domain">
                ({getHostname(story.url)})
              </span>
            )}
          </div>
          <div className="story-meta">
            <span className="story-points">{story.points || 0} points</span>
            <span className="story-separator">|</span>
            <span className="story-author">by {story.author || 'unknown'}</span>
            <span className="story-separator">|</span>
            <span className="story-time">{getTimeAgo(story.created_at)}</span>
            <span className="story-separator">|</span>
            <a 
              href={commentsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-comments"
            >
              {story.num_comments || 0} comments
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default StoryItem;
