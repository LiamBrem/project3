import { VscTrash } from "react-icons/vsc";
import { CONNECTION_URL } from "../../utils/constants";
import "./BoardCard.css";

const BoardCard = ({ id, title, author, onDelete, onClick }) => {
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

  const getAuthorLine = () => (author ? `By ${author}` : "Anonymous");

  return (
    <article className="board-card" onClick={onClick}>
      <img src={"https://picsum.photos/400/600"} alt={"board image"} />
      <div className="board-card-header">
        <h1 className="board-title">{title}</h1>
        <h2 className="board-author">{getAuthorLine()}</h2>
        <div className="bottom-row">
          <div className="delete-button" onClick={handleDelete}>
            <VscTrash className="delete-icon" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BoardCard;
