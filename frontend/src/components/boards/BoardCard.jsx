import { VscTrash } from "react-icons/vsc";
import "./boardCard.css";

const BoardCard = ({ title, author, imageUrl }) => {
    console.log(imageUrl);
    return(
    <article className="board-card">
        <img
          src={imageUrl}
          alt={'board image'}
        />
        <div className="board-card-header">
          <h1 className="board-title">{title}</h1>
          <h2 className="board-author">By {author}</h2>
          <div className="delete-button"><VscTrash className="delete-icon" /></div>
        </div>
      </article>
    );
}

export default BoardCard;