import { VscTrash } from "react-icons/vsc";
import "./boardCard.css";
import { CONNECTION_URL } from "../../utils/constants";


const BoardCard = ({ id, title, author, imageUrl, onDelete }) => {
    const handleDelete = async () => {
        const url = `${CONNECTION_URL}/api/boards/${id}`;
        try {
            await fetch(url, { method: "DELETE" });
            if (onDelete) onDelete(id);
        } catch (err) {
            console.error("Failed to delete board:", err);
        }
    };

    return(
    <article className="board-card">
        <img
          src={imageUrl}
          alt={'board image'}
        />
        <div className="board-card-header">
          <h1 className="board-title">{title}</h1>
          <h2 className="board-author">By {author}</h2>
          <div className="delete-button" onClick={handleDelete}><VscTrash className="delete-icon" /></div>
        </div>
      </article>
    );
}

export default BoardCard;