import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VscChevronLeft } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { CONNECTION_URL } from "../../utils/constants";
import InnerCard from "./InnerCard";
import CardModal from "../modal/CardModal";
import CommentModal from "../modal/CommentModal";
import "./BoardDetail.css";

const BoardDetail = () => {
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const boardId = useParams().id;

  useEffect(() => {
    // fetch board info - for title
    fetch(`${CONNECTION_URL}/api/boards/${boardId}`)
      .then((res) => res.json())
      .then(setBoard);

    // fetch board's cards
    fetch(`${CONNECTION_URL}/api/boards/${boardId}/cards/`)
      .then((res) => res.json())
      .then(setCards);
  }, [boardId]);

  const handleDelete = (id) => {
    // redisplay the boards - it already got deleted from the backend
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handlePinChange = (cardId, newPinned) => {
  setCards(prevCards => {
    const updated = prevCards.map(card =>
      card.id === cardId ? { ...card, pinned: newPinned } : card
    );
    // sort on the frontend
    return updated.sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.pinned - a.pinned;
    });
  });
};

  const handleModalSubmit = async (data) => {
    try {
      const response = await fetch(
        `${CONNECTION_URL}/api/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
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

  const handleCommentClick = (card) => {
    setActiveCard(card);
    setIsCommentModalOpen(true);
  };

  if (!board) return <h1>Loading...</h1>;

  return (
    <div className="board-detail">
      <div className="card-header">
        <div className="back-button" onClick={() => window.history.back()}>
          <button className="back-button">
            <VscChevronLeft />
          </button>
        </div>
        <h1 className="board-title">{board.title}</h1>
        <div className="add">
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            <VscAdd />
          </button>
        </div>
      </div>
      <section className="card-list">
        {cards.map((card) => (
          <InnerCard
            key={card.id}
            boardId={boardId}
            id={card.id}
            message={card.message}
            author={card.author}
            gifUrl={card.gifUrl}
            upvotes={card.upvotes}
            onDelete={handleDelete}
            onCommentClick={() => handleCommentClick(card)}
            pinned={card.pinned}
            onPinChange={handlePinChange}
          />
        ))}
      </section>

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {activeCard && (
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={() => setActiveCard(null)}
          title={activeCard.message}
          gifUrl={activeCard.gifUrl}
          cardAuthor={activeCard.author}
          cardId={activeCard.id}
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default BoardDetail;
