import { VscTrash } from "react-icons/vsc";
import "./CardCard.css";
import { CONNECTION_URL } from "../../utils/constants";

const CardCard = ({
  boardId,
  id,
  message,
  author,
  gifUrl,
  onDelete,
  onClick,
}) => {
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

  return (
    <article className="card-card" onClick={onClick}>
      <img src={gifUrl} alt={"card gif"} />
      <div className="card-card-header">
        <h1 className="card-message">{message}</h1>
        <h2 className="card-author">By {author}</h2>
        <div className="delete-button" onClick={handleDelete}>
          <VscTrash className="delete-icon" />
        </div>
      </div>
    </article>
  );
};

export default CardCard;
