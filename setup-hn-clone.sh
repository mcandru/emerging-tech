#!/bin/bash

# Create directory structure
mkdir -p hacker-news-clone/public
mkdir -p hacker-news-clone/src/components

# Create package.json
cat > hacker-news-clone/package.json << 'EOF'
{
  "name": "hacker-news-clone",
  "version": "1.0.0",
  "description": "A Hacker News clone using React and Algolia API",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# Create public/index.html
cat > hacker-news-clone/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Hacker News Clone" />
    <title>Hacker News Clone</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

# Create src/index.js
cat > hacker-news-clone/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create src/index.css
cat > hacker-news-clone/src/index.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 10pt;
  color: #000;
  background-color: #f6f6ef;
}

a {
  color: #000;
  text-decoration: none;
}

a:visited {
  color: #828282;
}

a:hover {
  text-decoration: underline;
}
EOF

# Create src/App.js
cat > hacker-news-clone/src/App.js << 'EOF'
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
EOF

# Create src/App.css
cat > hacker-news-clone/src/App.css << 'EOF'
.App {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f6f6ef;
}

.loading,
.error {
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
}

.error {
  color: #d00;
}
EOF

# Create components
cat > hacker-news-clone/src/components/Header.js << 'EOF'
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img 
          src="https://news.ycombinator.com/y18.gif" 
          alt="Y Combinator" 
          className="header-logo"
        />
        <span className="header-title">Hacker News</span>
      </div>
    </header>
  );
}

export default Header;
EOF

cat > hacker-news-clone/src/components/Header.css << 'EOF'
.header {
  background-color: #ff6600;
  padding: 2px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.header-logo {
  width: 18px;
  height: 18px;
  border: 1px solid white;
}

.header-title {
  font-weight: bold;
  color: #000;
  font-size: 11pt;
}
EOF

cat > hacker-news-clone/src/components/SearchBar.js << 'EOF'
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
EOF

cat > hacker-news-clone/src/components/SearchBar.css << 'EOF'
.search-bar {
  padding: 15px;
  background-color: #f6f6ef;
  border-bottom: 2px solid #ff6600;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: Verdana, Geneva, sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: #ff6600;
}

.search-button {
  padding: 8px 20px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
  font-weight: bold;
}

.search-button:hover {
  background-color: #e65c00;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
}

.filter-btn:hover {
  background-color: #f0f0f0;
}

.filter-btn.active {
  background-color: #ff6600;
  color: white;
  border-color: #ff6600;
}
EOF

cat > hacker-news-clone/src/components/StoryList.js << 'EOF'
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
EOF

cat > hacker-news-clone/src/components/StoryList.css << 'EOF'
.story-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f6f6ef;
}

.no-stories {
  text-align: center;
  padding: 40px 20px;
  color: #828282;
}
EOF

cat > hacker-news-clone/src/components/StoryItem.js << 'EOF'
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
EOF

cat > hacker-news-clone/src/components/StoryItem.css << 'EOF'
.story-item {
  padding: 5px 10px;
  border-bottom: 1px solid #e6e6df;
}

.story-main {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.story-rank {
  color: #828282;
  font-size: 10pt;
  min-width: 25px;
  text-align: right;
}

.story-content {
  flex: 1;
}

.story-title-row {
  margin-bottom: 4px;
  line-height: 1.3;
}

.story-title {
  color: #000;
  font-size: 10pt;
}

.story-title:visited {
  color: #828282;
}

.story-domain {
  color: #828282;
  font-size: 8pt;
  margin-left: 5px;
}

.story-meta {
  font-size: 7pt;
  color: #828282;
}

.story-separator {
  margin: 0 4px;
}

.story-points,
.story-author,
.story-time,
.story-comments {
  color: #828282;
}

.story-comments {
  cursor: pointer;
}

.story-comments:hover {
  text-decoration: underline;
}
EOF

cat > hacker-news-clone/src/components/Pagination.js << 'EOF'
import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, nbPages, onPageChange }) {
  const maxPagesToShow = 10;
  const pages = [];
  
  let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(nbPages - 1, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 0 && (
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>
      )}
      
      {startPage > 0 && (
        <>
          <button 
            onClick={() => onPageChange(0)}
            className="pagination-btn"
          >
            1
          </button>
          {startPage > 1 && <span className="pagination-ellipsis">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
        >
          {page + 1}
        </button>
      ))}
      
      {endPage < nbPages - 1 && (
        <>
          {endPage < nbPages - 2 && <span className="pagination-ellipsis">...</span>}
          <button 
            onClick={() => onPageChange(nbPages - 1)}
            className="pagination-btn"
          >
            {nbPages}
          </button>
        </>
      )}
      
      {currentPage < nbPages - 1 && (
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
EOF

cat > hacker-news-clone/src/components/Pagination.css << 'EOF'
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background-color: #f6f6ef;
}

.pagination-btn {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
  min-width: 35px;
}

.pagination-btn:hover {
  background-color: #f0f0f0;
}

.pagination-btn.active {
  background-color: #ff6600;
  color: white;
  border-color: #ff6600;
  font-weight: bold;
}

.pagination-ellipsis {
  color: #828282;
  font-size: 11px;
  padding: 0 4px;
}
EOF

# Create .gitignore
cat > hacker-news-clone/.gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF

# Create README
cat > hacker-news-clone/README.md << 'EOF'
# Hacker News Clone

A Hacker News clone built with React and the Algolia HN Search API.

## Features

- 📰 Browse top Hacker News stories
- 🔍 Search stories by keyword
- 📅 Filter by popularity or date
- 📄 Pagination support
- 🎨 Classic Hacker News UI

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- Algolia HN Search API
- CSS3

## API

This app uses the [Algolia Hacker News Search API](https://hn.algolia.com/api) to fetch stories.

## License

MIT
EOF

echo "✅ Hacker News Clone app created successfully!"
echo ""
echo "Next steps:"
echo "  cd hacker-news-clone"
echo "  npm install"
echo "  npm start"
