import { useState } from "react";
import "./App.css";
import Search from "./components/outer/Search";
import Sort from "./components/outer/Sort";

function App() {
  return (
    <>
      <banner className="banner">
        <div className="title-container">
          <h1>Kudos Board</h1>
        </div>

        <div className="controls">
          <Search />
          <Sort />
        </div>
        <div className="rain"></div>
      </banner>
      <section className="content">
        
      </section>
      <footer className="footer">
        <h3>By Liam Brem</h3>
      </footer>
    </>
  );
}

export default App;
