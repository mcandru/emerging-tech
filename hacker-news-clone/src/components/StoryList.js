import React from 'react';
import StoryItem from './StoryItem';
import './StoryList.css';

function StoryList({ stories }) {
  if (!stories || stories.length === 0) {
    return <div className="no-stories">No stories found</div>;
  }

  return (
    <ol className="story-list">
      {stories.map((story, index) => (
        <StoryItem key={story.objectID} story={story} rank={index + 1} />
      ))}
    </ol>
  );
}

export default StoryList;
