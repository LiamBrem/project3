import BoardCard from "./BoardCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONNECTION_URL } from "../../utils/constants";
import "./boardList.css";

const fetchBoardData = async (searchCriteria, sortCriteria) => {
  let url = `${CONNECTION_URL}/api/boards?searchCriteria=${searchCriteria}&sortCriteria=${sortCriteria}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();
  return data;
};

const BoardList = ({ searchCriteria, sortCriteria, refresh }) => {
  const [displayBoardData, setDisplayBoardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBoardData = async () => {
      try {
        const boardData = await fetchBoardData(searchCriteria, sortCriteria);
        setDisplayBoardData(boardData);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoardData();
  }, [searchCriteria, sortCriteria, refresh]);

  const handleDelete = (id) => {
    // redisplay the boards - it already got deleted from the backend
    setDisplayBoardData((prevBoards) =>
      prevBoards.filter((board) => board.id !== id)
    );
  };

  const handleBoardOnClick = (id) => {
    navigate(`/boards/${id}/cards/`);
  }

  return (
    <section className="board-list">
      {displayBoardData.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.title}
          author={board.author}
          imageUrl={board.imageUrl}
          onDelete={() => handleDelete(board.id)}
          onClick={() => handleBoardOnClick(board.id)}
        />
      ))}
    </section>
  );
};

export default BoardList;
