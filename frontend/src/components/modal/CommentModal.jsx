import { useState, useEffect } from "react";
import "./Modal.css";
import { VscClose } from "react-icons/vsc";
import { CONNECTION_URL } from "../../utils/constants";

const CommentModal = ({
  isOpen,
  onClose,
  title,
  gifUrl,
  cardAuthor,
  cardId,
  boardId,
}) => {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [allComments, setAllComments] = useState([]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    //push comment to server
    const data = {
      message: comment,
      author: author || "Anonymous",
    };
    fetch(`${CONNECTION_URL}/api/boards/${boardId}/cards/${cardId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        return response.json();
      })
      .then(() => {
        setComment("");
        setAuthor("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        alert("Failed to add comment.");
      });
  };

  const fetchAllComments = () => {
    fetch(`${CONNECTION_URL}/api/boards/${boardId}/cards/${cardId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((data) => {
        setAllComments(data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        alert("Failed to fetch comments.");
      });
  };

  useEffect(() => {
    fetchAllComments();
  }, [boardId, comment]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="title">{title}</h1>
        <h3 className="card-author">{cardAuthor}</h3>
        <div className="gif-container">
          <img src={gifUrl} alt={"card gif"} />
        </div>

        <button className="modal-close" onClick={onClose}>
          <VscClose />
        </button>
        <div className="modal-lower">
          {" "}
          <form onSubmit={handleSubmit}>
            <label>
              Comment:
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>
            <label>
              Author (optional):
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <button type="submit">Add comment</button>
          </form>
          <div className="comments-section">
            <h2>Comments:</h2>
            <ul>
              {allComments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.author}:</strong> {comment.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
