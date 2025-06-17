import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONNECTION_URL } from "../../utils/constants";
import CardCard from "../cards/CardCard";
import { VscChevronLeft } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import "./boardDetail.css";
import CardModal from "../modal/CardModal";

const BoardDetail = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleClick = (id) => {
    console.log("Card clicked:", id);
  };

  const handleModalSubmit = async (data) => {
    try {
      const response = await fetch(`${CONNECTION_URL}/api/boards/${boardId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add card");
      }
      const newCard = await response.json();
      setCards((prevCards) => [...prevCards, newCard]);
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to add card.");
    }
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
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
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

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default BoardDetail;
