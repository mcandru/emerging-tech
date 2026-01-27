import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDomain, timeAgo } from "./utils";

function Comment({ comment }) {
  if (!comment.text) return null;

  return (
    <div className="comment" style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div
        className="comment-meta"
        style={{ fontSize: "0.8em", color: "#828282" }}
      >
        {comment.author} {timeAgo(comment.created_at)} ago
      </div>
      <div
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: comment.text }}
        style={{ overflowWrap: "break-word" }}
      />
      {comment.children &&
        comment.children.map((child) => (
          <Comment key={child.id} comment={child} />
        ))}
    </div>
  );
}

function StoryComments() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://hn.algolia.com/api/v1/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found</p>;

  return (
    <div className="story-details">
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
          &larr; Back
        </Link>
      </div>
      <div className="story-header" style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "1.2em", margin: "0" }}>
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#000" }}
          >
            {story.title}
          </a>
          {story.url && (
            <span
              className="story-domain"
              style={{ color: "#828282", fontSize: "0.8em", marginLeft: "5px" }}
            >
              ({getDomain(story.url)})
            </span>
          )}
        </h1>
        <div
          className="story-meta"
          style={{ fontSize: "0.8em", color: "#828282" }}
        >
          {story.points} points by {story.author} {timeAgo(story.created_at)}{" "}
          ago | {story.children.length} comments
        </div>
      </div>

      <div className="comments-section">
        {story.children &&
          story.children.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default StoryComments;
