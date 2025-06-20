import { VscTrash } from "react-icons/vsc";
import "./InnerCard.css";
import { CONNECTION_URL } from "../../utils/constants";
import { VscPinned } from "react-icons/vsc";
import { VscPinnedDirty } from "react-icons/vsc";
import { useState, useEffect } from "react";

const InnerCard = ({
  boardId,
  id,
  message,
  author,
  gifUrl,
  upvotes,
  onDelete,
  onCommentClick,
  pinned,
  onPinChange,
}) => {
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [isPinned, setIsPinned] = useState(pinned);

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

  useEffect(() => {
    setIsPinned(pinned);
  }, [pinned]);

  const handlePin = async (e) => {
    e.stopPropagation();
    const newPinned = !isPinned;
    setIsPinned(newPinned);

    const endpoint = newPinned ? "pin" : "unpin";
    try {
      const url = `${CONNECTION_URL}/api/boards/${boardId}/cards/${id}/${endpoint}`;
      const response = await fetch(url, { method: "PUT" });
      if (!response.ok) throw new Error("Failed to update pin status");
      if (onPinChange) onPinChange(id, newPinned);
    } catch (err) {
      setIsPinned((prev) => !prev);
      alert("Failed to update pin status.");
    }
  };

  return (
    <article className="inner-card" onClick={onCommentClick}>
      <img src={gifUrl} alt={"card gif"} />
      <div className="inner-card-header">
        <h1 className="card-message">{message}</h1>
        <h2 className="card-author">By {author}</h2>
        <div className="bottom-row">
            <div className="delete-button" onClick={handleDelete}>
              <VscTrash className="delete-icon" />
            </div>
            <button onClick={handleUpvote}>{`Upvotes: ${localUpvotes}`}</button>
            <div className="pin-icon" onClick={handlePin}>
              {isPinned ? <VscPinnedDirty /> : <VscPinned />}
            </div>
          </div>
        </div>
    </article>
  );
};

export default InnerCard;
