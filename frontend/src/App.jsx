import { useState } from "react";
import "./App.css";
import Search from "./components/outer/Search";
import Sort from "./components/outer/Sort";
import BoardList from "./components/boards/boardList";
import { SORT_OPTIONS } from "./utils/constants";

function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS.DEFAULT);

  return (
    <>
      <header className="banner">
        <div className="title-container">
          <h1>Kudos Board</h1>
        </div>

        <div className="controls">
          <Search onSearch={setSearch} />
          <Sort value={sort} onSort={setSort} />
        </div>
        <div className="rain"></div>
      </header>
      <section className="content"><BoardList searchCriteria={search} sortCriteria={sort}/></section>
      <footer className="footer">
        <h3>By Liam Brem</h3>
      </footer>
    </>
  );
}

export default App;
