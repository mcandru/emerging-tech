import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDomain, timeAgo } from "./utils";

function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://hn.algolia.com/api/v1/search_by_date?tags=story")
      .then((response) => response.json())
      .then((data) => {
        setStories(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ol className="story-list">
      {stories.map((story) => (
        <li key={story.objectID} className="story-item">
          <div className="story-main">
            <a
              href={
                story.url ||
                `https://news.ycombinator.com/item?id=${story.objectID}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="story-title"
            >
              {story.title}
            </a>
            {story.url && (
              <span className="story-domain">({getDomain(story.url)})</span>
            )}
          </div>
          <div className="story-meta">
            {story.points} points by {story.author} {timeAgo(story.created_at)}{" "}
            ago
            {" | "}
            <Link to={`/item/${story.objectID}`}>
              {story.num_comments} comments
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default StoriesList;
