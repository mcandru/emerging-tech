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
