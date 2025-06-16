import BoardCard from "./BoardCard";
import { useState, useEffect } from "react";
import { CONNECTION_URL } from "../../utils/constants";
import "./boardList.css";

const fetchBoardData = async (searchCriteria, sortCriteria) => {
  let url = `${CONNECTION_URL}/api/boards`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();
  return data;
};

const BoardList = ({ searchCriteria, sortCriteria }) => {
  const [displayBoardData, setDisplayBoardData] = useState([]);

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
  }, [searchCriteria, sortCriteria]);


  return (
    <section className="board-list">
      {displayBoardData.map((board) => (
        <BoardCard
            key={board.id}
          title={board.title}
          author={board.author}
          imageUrl={board.imageUrl}
        />
      ))}
    </section>
  );
};

export default BoardList;
