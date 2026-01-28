import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import StoryList from './components/StoryList'
import Search from './components/Search'
import StoryDetail from './components/StoryDetail'

function Header() {
  const location = useLocation()
  const activeTab = location.pathname === '/search' ? 'search' : location.pathname === '/new' ? 'new' : 'top'

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <span className="logo-icon">Y</span> Hacker News
        </h1>
        <nav className="nav">
          <Link 
            to="/"
            className={activeTab === 'top' ? 'active' : ''}
          >
            Top
          </Link>
          <Link 
            to="/new"
            className={activeTab === 'new' ? 'active' : ''}
          >
            New
          </Link>
          <Link 
            to="/search"
            className={activeTab === 'search' ? 'active' : ''}
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<StoryList filter="top" />} />
            <Route path="/new" element={<StoryList filter="new" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/story/:id" element={<StoryDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
