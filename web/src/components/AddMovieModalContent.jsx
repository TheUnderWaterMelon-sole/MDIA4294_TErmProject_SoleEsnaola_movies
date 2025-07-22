import React, { useState, useEffect } from "react";
import m from "./AddMovieModalContent.module.css";
import g from "../global.module.css";

function AddMovieModalContent({ onClose, onMovieAdded }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  // Director logic
  const [dbDirectors, setDbDirectors] = useState([]);
  const [director, setDirector] = useState("");
  const [isNewDirector, setIsNewDirector] = useState(false);
  const [newDirector, setNewDirector] = useState("");

  // Genre logic
  const [dbGenres, setDbGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [isNewGenre, setIsNewGenre] = useState(false);
  const [newGenre, setNewGenre] = useState("");

  // Fetch directors and genres from API on mount
  useEffect(() => {
    fetch("http://localhost:3001/api/directors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch directors");
        return res.json();
      })
      .then((data) => {
        setDbDirectors(data);
        if (data.length > 0) setDirector(data[0].id);
      })
      .catch((err) => {
        setDbDirectors([]);
        setDirector("");
        console.error("Failed to fetch directors:", err);
      });

    fetch("http://localhost:3001/api/genres")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch genres");
        return res.json();
      })
      .then((data) => {
        setDbGenres(data);
        if (data.length > 0) setGenre(data[0].id);
      })
      .catch((err) => {
        setDbGenres([]);
        setGenre("");
        console.error("Failed to fetch genres:", err);
      });
  }, []);

  // Handle select changes for director/genre
  const handleDirectorSelectChange = (e) => {
    if (e.target.value === "-1") {
      setIsNewDirector(true);
      setDirector("");
    } else {
      setIsNewDirector(false);
      setDirector(e.target.value);
    }
  };

  const handleGenreSelectChange = (e) => {
    if (e.target.value === "-1") {
      setIsNewGenre(true);
      setGenre("");
    } else {
      setIsNewGenre(false);
      setGenre(e.target.value);
    }
  };

  // Unique ID generation logic with safety check (optional)
  const generateUniqueId = async () => {
    let newId;
    let exists = true;
    do {
      newId = `movie_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      // Call backend API to check if this ID exists
      const res = await fetch(`http://localhost:3001/api/movies/${newId}`);
      exists = res.status === 200; // If found, try again
    } while (exists);
    return newId;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handle new director
      let directorId = director;
      if (isNewDirector && newDirector.trim() !== "") {
        const res = await fetch("http://localhost:3001/api/directors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newDirector }),
        });
        if (!res.ok) throw new Error("Failed to add director");
        const data = await res.json();
        directorId = data.directorId; // Use the correct field
      }

      // Handle new genre
      let genreId = genre;
      if (isNewGenre && newGenre.trim() !== "") {
        const res = await fetch("http://localhost:3001/api/genres", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newGenre }),
        });
        if (!res.ok) throw new Error("Failed to add genre");
        const data = await res.json();
        genreId = data.genreId; // Use the correct field
      }

      // Generate a unique id for the movie (optional, only if your backend expects client-generated IDs)
      const uniqueId = await generateUniqueId();

      // Create FormData object to send the movie data including the image file
      const formData = new FormData();
      formData.append("id", uniqueId);
      formData.append("title", title);
      formData.append("director", directorId);
      formData.append("genre", genreId);
      formData.append("image", image);

      // POST to your API
      const res = await fetch("http://localhost:3001/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add movie");
      const result = await res.json();
      console.log("Result:", result);

      onMovieAdded();
      onClose();
    } catch (error) {
      alert(error.message || "An error occurred while adding the movie.");
      console.error(error);
    }
  };

  return (
    <div className={m["modal-container"]}>
      <div className={`${m["modal"]} ${g["card"]}`}>
        <h3>Add a new movie</h3>
        <form
          className={`${g["form-group"]} ${g["grid-container"]}`}
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          <div className={g["col-12"]}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Director select/new */}
          <div className={g["col-12"]}>
            <label htmlFor="director">Director</label>
            <select
              id="director"
              value={isNewDirector ? "-1" : director}
              onChange={handleDirectorSelectChange}
              required={!isNewDirector}
            >
              {dbDirectors.map((dir) => (
                <option key={dir.id} value={dir.id}>
                  {dir.name}
                </option>
              ))}
              <option value="-1">+ Add new director</option>
            </select>
            {isNewDirector && (
              <input
                type="text"
                placeholder="New director name"
                value={newDirector}
                onChange={(e) => setNewDirector(e.target.value)}
                required
              />
            )}
          </div>

          {/* Genre select/new */}
          <div className={g["col-12"]}>
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              value={isNewGenre ? "-1" : genre}
              onChange={handleGenreSelectChange}
              required={!isNewGenre}
            >
              {dbGenres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
              <option value="-1">+ Add new genre</option>
            </select>
            {isNewGenre && (
              <input
                type="text"
                placeholder="New genre name"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                required
              />
            )}
          </div>

          {/* Image */}
          <div className={g["col-12"]}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className={g["col-12"]}>
            <button className={g["button"]} type="submit">
              Add movie
            </button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>
          ✖️
        </button>
      </div>
    </div>
  );
}

export default AddMovieModalContent;