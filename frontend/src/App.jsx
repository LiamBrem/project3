import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SORT_OPTIONS, CONNECTION_URL } from "./utils/constants";
import { VscAdd } from "react-icons/vsc";
import Search from "./components/outer/Search";
import Sort from "./components/outer/Sort";
import BoardList from "./components/boards/BoardList";
import BoardDetail from "./components/cards/BoardDetail";
import BoardModal from "./components/modal/BoardModal";
import ThemeToggle from "./components/outer/ThemeToggle";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS.ALL);
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchBoardData = async (searchCriteria, sortCriteria) => {
    let url = `${CONNECTION_URL}/api/boards?searchCriteria=${searchCriteria}&sortCriteria=${sortCriteria}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = await response.json();
    return data;
  };

  const handleModalSubmit = async (data) => {
    try {
      const response = await fetch(`${CONNECTION_URL}/api/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add board");
      }
      setModalOpen(false);
      const updatedBoards = await fetchBoardData(search, sort);
      setBoards(updatedBoards);
    } catch (err) {
      alert("Failed to add board.");
    }
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const data = await fetchBoardData(search, sort);
      setBoards(data);
    };
    fetchBoards();
  }, [search, sort]);

  return (
    <>
      <header className="banner">
        <div className="title-container">
          <h1>Kudos Board</h1>
          <ThemeToggle />
        </div>
        <div className="rain"></div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="banner-second-row">
                <div className="controls">
                  <Search onSearch={setSearch} />
                  <Sort value={sort} onSort={setSort} />
                </div>
                <div className="add">
                  <button
                    className="add-button"
                    onClick={() => setModalOpen(true)}
                  >
                    <VscAdd />
                  </button>
                </div>
              </div>
              <section className="content">
                <BoardList boards={boards} setBoards={setBoards} />
              </section>
            </>
          }
        />
        <Route path="/boards/:id/cards/" element={<BoardDetail />} />
      </Routes>
      <footer className="footer">
        <h3>By Liam Brem</h3>
      </footer>
      <BoardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

export default App;
