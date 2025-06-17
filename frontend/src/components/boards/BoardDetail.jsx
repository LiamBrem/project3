import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONNECTION_URL } from "../../utils/constants";
import CardCard from "../cards/CardCard";
import { VscChevronLeft } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import "./boardDetail.css";

const BoardDetail = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);

  const boardId = id;

  useEffect(() => {
    // fetch board info
    fetch(`${CONNECTION_URL}/api/boards/${boardId}`)
      .then((res) => res.json())
      .then(setBoard);

    // fetch board's cards
    fetch(`${CONNECTION_URL}/api/boards/${boardId}/cards/?${boardId}`)
      .then((res) => res.json())
      .then(setCards);
  }, [cards]);

  const handleDelete = (id) => {
    // redisplay the boards - it already got deleted from the backend
    setDisplayBoardData((prevBoards) =>
      prevBoards.filter((board) => board.id !== id)
    );
  };

  const handleClick = (id) => {
    console.log("Card clicked:", id);
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="board-detail">
      <div className="card-header">
        <div className="back-button" onClick={() => window.history.back()}>
          <button>
            <VscChevronLeft />
          </button>
        </div>
        <h2 className="board-title">{board.title}</h2>
        <div className="add">
          <button className="add-button">
            <VscAdd />
          </button>
        </div>
      </div>
      <section className="card-list">
        {cards.map((card) => (
          <CardCard
            key={card.id}
            boardId={boardId}
            id={card.id}
            message={card.message}
            author={card.author}
            gifUrl={card.gifUrl}
            onDelete={handleDelete}
            onClick={handleClick}
          />
        ))}
      </section>

    </div>
  );
};

export default BoardDetail;
