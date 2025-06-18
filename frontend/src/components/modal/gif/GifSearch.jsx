import { useState, useEffect } from "react";
import "./GifSearch.css"; 

const GifSearch = ({ onGifSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGifs = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=6`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Failed to fetch GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [searchTerm]);

  return (
    <div className="gif-search-modal">
      <input
        type="text"
        placeholder="Search for GIFs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gif-results">
          {gifs.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => onGifSelect(gif.images.fixed_height.url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GifSearch;
