//web/MovieList.jsx

import React, { useEffect, useState } from "react";
import AddMovieModal from "./AddMovieModal";

const API_URL = "http://localhost:3001/api/movies";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  // Fetch movies from the API
  const fetchMovies = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <div className="movie-list-header">
        <h2>Movie Collection</h2>
        <AddMovieModal onMovieAdded={fetchMovies} />
      </div>
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`http://localhost:3001/images/${movie.image}`}
              alt={movie.title}
              style={{ width: "180px", height: "260px", objectFit: "cover", borderRadius: "12px", background: "#fff" }}
              onError={e => { e.target.src = "/fallback.jpg"; }}
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