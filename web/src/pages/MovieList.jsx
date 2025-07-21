// movieList.jsx

// ===== File: web/src/components/MovieList.jsx =====
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/api/movies";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <div className="movie-list-header">
        <h2>Movie Collection</h2>
        <button className="add-movie-btn">Add Movie</button>
      </div>
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`http://localhost:3001/images/${movie.image}`}
              alt={movie.title}
            />
            <div className="movie-title">{movie.title}</div>
            <div className="movie-meta">
              {movie.director} &middot; {movie.genre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}