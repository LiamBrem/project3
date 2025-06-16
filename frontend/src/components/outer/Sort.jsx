import "./Sort.css";
import { SORT_OPTIONS } from "../../utils/constants";

const Sort = ({ value, onSort }) => {
  const submitSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="sort-container">
      <select value={value} onChange={submitSort}>
        <option value={SORT_OPTIONS.ALL}>All</option>
        <option value={SORT_OPTIONS.RECENT}>Recent</option>
        <option value={SORT_OPTIONS.CELEBRATION}>Celebration</option>
        <option value={SORT_OPTIONS.THANK_YOU}>Thank You</option>
        <option value={SORT_OPTIONS.INSPIRATION}>Inspiration</option>
      </select>
    </div>
  );
};

export default Sort;