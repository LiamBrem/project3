import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { VscCircleSlash } from "react-icons/vsc";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-form" onSubmit={submitSearch}>
      <input
        type="text"
        placeholder="Search for a board..."
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="search-button">
        <VscSearch />
      </button>
      <button
        type="clear"
        className="clear-button"
        onClick={() => {
          setInput("");
          onSearch("");
        }}
      >
        <VscCircleSlash />
      </button>
    </form>
  );
};

export default Search;
