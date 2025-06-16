import BoardCard from "./BoardCard";
import { useState, useEffect } from "react";

const BoardList = ({ searchCriteria, sortCriteria }) => {

    const [displayBoardData, setDisplayBoardData] = useState([]);

  return (
    <section className="board-list">
      {displayBoardData.map((board) => {<BoardCard />})}
    </section>
  );
};

export default BoardList;
