import { useState } from 'react'
import './App.css'
import StoryList from './components/StoryList'
import Search from './components/Search'

function App() {
  const [activeTab, setActiveTab] = useState('top')

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">Y</span> Hacker News
          </h1>
          <nav className="nav">
            <button 
              className={activeTab === 'top' ? 'active' : ''} 
              onClick={() => setActiveTab('top')}
            >
              Top
            </button>
            <button 
              className={activeTab === 'new' ? 'active' : ''} 
              onClick={() => setActiveTab('new')}
            >
              New
            </button>
            <button 
              className={activeTab === 'search' ? 'active' : ''} 
              onClick={() => setActiveTab('search')}
            >
              Search
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {activeTab === 'search' ? (
          <Search />
        ) : (
          <StoryList filter={activeTab} />
        )}
      </main>
    </div>
  )
}

export default App
