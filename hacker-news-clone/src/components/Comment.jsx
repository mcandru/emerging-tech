import { useState } from 'react';

const Comment = ({ comment, level = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (!comment || !comment.text) {
    return null;
  }

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

  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div className="comment" style={{ marginLeft: level > 0 ? '2rem' : '0' }}>
      <div className="comment-header">
        <button 
          className="comment-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          [{collapsed ? '+' : '-'}]
        </button>
        <span className="comment-author">{comment.author}</span>
        <span className="comment-separator"> | </span>
        <span className="comment-time">{formatDate(comment.created_at)}</span>
      </div>
      
      {!collapsed && (
        <>
          <div 
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          
          {hasChildren && (
            <div className="comment-children">
              {comment.children.map((child, index) => (
                <Comment key={child.id || index} comment={child} level={level + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
