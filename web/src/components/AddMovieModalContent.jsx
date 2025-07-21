// web/src/components/AddMovieModalContent.jsx - Modal content for adding/editing movies (based on 4-C AddTapeModalContent)

import { useState } from "react";

function AddMovieModalContent({ onMovieAdded, onClose }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);

  // Handle image file upload to backend
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:3001/api/storage/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.filename;
  };

  // Handle form submit to create a new movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    let filename = "";
    if (image) {
      filename = await handleImageUpload(image);
    }
    // Send movie data to backend
    await fetch("http://localhost:3001/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        director,
        genre,
        image: filename,
      }),
    });
    onMovieAdded();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Movie</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieModalContent;