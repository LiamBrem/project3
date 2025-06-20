import BoardCard from "./BoardCard";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardList.css";

const BoardList = ({ boards, setBoards }) => {
  const navigate = useNavigate();

  const handleDelete = useCallback((id) => {
    // redisplay the boards - it already got deleted from the backend
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
  }, []);

  const handleBoardOnClick = (id) => {
    navigate(`/boards/${id}/cards/`);
  };

  return (
    <section className="board-list">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.title}
          author={board.author}
          onDelete={() => handleDelete(board.id)}
          onClick={() => handleBoardOnClick(board.id)}
          category={board.category}
        />
      ))}
    </section>
  );
};

export default BoardList;
