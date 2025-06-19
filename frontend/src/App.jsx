import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./components/outer/Search";
import Sort from "./components/outer/Sort";
import BoardList from "./components/boards/BoardList";
import BoardDetail from "./components/cards/BoardDetail";
import Modal from "./components/modal/Modal";
import ThemeToggle from "./components/outer/ThemeToggle";
import { SORT_OPTIONS, CONNECTION_URL } from "./utils/constants";
import { VscAdd } from "react-icons/vsc";

function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS.ALL);
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshBoards, setRefreshBoards] = useState(false);

  const handleModalSubmit = async (data) => {
    try {
      await fetch(`${CONNECTION_URL}/api/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setModalOpen(false);
      setRefreshBoards((prev) => !prev); // trigger a refresh
    } catch (err) {
      alert("Failed to add board.");
    }
  };

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
                <BoardList
                  searchCriteria={search}
                  sortCriteria={sort}
                  refresh={refreshBoards}
                />
              </section>
            </>
          }
        />
        <Route path="/boards/:id/cards/" element={<BoardDetail />} />
      </Routes>
      <footer className="footer">
        <h3>By Liam Brem</h3>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

export default App;
