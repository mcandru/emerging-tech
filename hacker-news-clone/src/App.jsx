import { useState } from 'react'
import './App.css'
import StoryList from './components/StoryList'
import Search from './components/Search'
import StoryDetail from './components/StoryDetail'

function App() {
  const [activeTab, setActiveTab] = useState('top')
  const [selectedStoryId, setSelectedStoryId] = useState(null)

  const handleCommentClick = (storyId) => {
    setSelectedStoryId(storyId)
  }

  const handleBack = () => {
    setSelectedStoryId(null)
  }

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
              onClick={() => {
                setActiveTab('top')
                setSelectedStoryId(null)
              }}
            >
              Top
            </button>
            <button 
              className={activeTab === 'new' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('new')
                setSelectedStoryId(null)
              }}
            >
              New
            </button>
            <button 
              className={activeTab === 'search' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('search')
                setSelectedStoryId(null)
              }}
            >
              Search
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        {selectedStoryId ? (
          <StoryDetail storyId={selectedStoryId} onBack={handleBack} />
        ) : activeTab === 'search' ? (
          <Search onCommentClick={handleCommentClick} />
        ) : (
          <StoryList filter={activeTab} onCommentClick={handleCommentClick} />
        )}
      </main>
    </div>
  )
}

export default App
