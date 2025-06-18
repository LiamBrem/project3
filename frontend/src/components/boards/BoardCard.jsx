import { useState } from "react";
import { VscTrash } from "react-icons/vsc";
import { VscPinned } from "react-icons/vsc";
import { VscPinnedDirty } from "react-icons/vsc";
import { CONNECTION_URL } from "../../utils/constants";
import "./boardCard.css";

const BoardCard = ({ id, title, author, imageUrl, onDelete, onClick }) => {
  const [isPinned, setIsPinned] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    const url = `${CONNECTION_URL}/api/boards/${id}`;
    try {
      await fetch(url, { method: "DELETE" });
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };

  const handlePin = (e) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  return (
    <article className="board-card" onClick={onClick}>
      <img src={imageUrl} alt={"board image"} />
      <div className="board-card-header">
        <h1 className="board-title">{title}</h1>
        <h2 className="board-author">By {author}</h2>
        <div className="bottom-row">
          <div className="delete-button" onClick={handleDelete}>
            <VscTrash className="delete-icon" />
          </div>
          <div className="pin-icon" onClick={handlePin}>
            {isPinned ? <VscPinnedDirty /> : <VscPinned />}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BoardCard;
