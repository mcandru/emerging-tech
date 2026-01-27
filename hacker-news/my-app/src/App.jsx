import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoriesList from "./StoriesList";
import StoryComments from "./StoryComments";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="header-logo">Y</div>
          <div className="header-title">Hacker News</div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<StoriesList />} />
            <Route path="/item/:id" element={<StoryComments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
