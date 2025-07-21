// web/src/components/MovieList.jsx - Displays all movies (based on 4-C TapeList)

import { useState, useEffect } from "react";
import AddMovieModal from "../components/AddMovieModal";

function MovieList() {
  const [movies, setMovies] = useState([]);

  // Fetch all movies from API
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:3001/api/movies");
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <AddMovieModal onMovieAdded={fetchMovies} />
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`http://localhost:3001/uploads/${movie.image}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-title">{movie.title}</div>
            <div className="movie-meta">
              Director: {movie.director} | Genre: {movie.genre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;