import { VscTrash } from "react-icons/vsc";
import "./CardCard.css";
import { CONNECTION_URL } from "../../utils/constants";
import { useState, useEffect } from "react";

const CardCard = ({
  boardId,
  id,
  message,
  author,
  gifUrl,
  upvotes,
  onDelete,
  onClick,
}) => {
  const [localUpvotes, setLocalUpvotes] = useState(upvotes); 

  const handleDelete = async (e) => {
    e.stopPropagation();
    const url = `${CONNECTION_URL}/api/boards/${boardId}/cards/${id}`;
    try {
      await fetch(url, { method: "DELETE" });
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };

  const handleUpvote = async (e) => {
    e.stopPropagation();
    const url = `${CONNECTION_URL}/api/boards/${boardId}/cards/${id}/upvote`;
    try {
      const response = await fetch(url, { method: "PUT" });
      if (!response.ok) {
        throw new Error("Failed to upvote card");
      }
      const data = await response.json();
      setLocalUpvotes(data.upvotes);
    } catch (err) { 
      console.error("Failed to upvote card:", err);
    }
  };

  return (
    <article className="card-card" onClick={onClick}>
      <img src={gifUrl} alt={"card gif"} />
      <div className="card-card-header">
        <h1 className="card-message">{message}</h1>
        <h2 className="card-author">By {author}</h2>
        <div className="bottom-row">
          <div className="delete-button" onClick={handleDelete}>
            <VscTrash className="delete-icon" />
          </div>
          <div className="upvotes">
            <button onClick={handleUpvote}>{`Upvotes: ${localUpvotes}`}</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardCard;
