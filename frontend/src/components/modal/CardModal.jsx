import { useState } from "react";
import { VscClose } from "react-icons/vsc";
import GifSearch from "./gif/GifSearch";
import "./Modal.css";

const CardModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [message, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [gifUrl, setGifUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, message, gifUrl, author });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <VscClose />
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={message}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <GifSearch onGifSelect={setGifUrl} />
          <label>
            GIF URL:
            <input
              type="text"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Author (optional):
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
