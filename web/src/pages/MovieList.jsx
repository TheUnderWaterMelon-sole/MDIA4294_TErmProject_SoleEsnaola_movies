// MovieList.jsx - Movie listing page styled like CineVerse

import React, { useEffect, useState } from "react";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch movies from API
  useEffect(() => {
    fetch("http://localhost:3001/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        // Get unique directors and genres for the filter dropdowns
        setDirectors([
          "All",
          ...Array.from(new Set(data.map((m) => m.director))).sort(),
        ]);
        setGenres([
          "All",
          ...Array.from(new Set(data.map((m) => m.genre))).sort(),
        ]);
      });
  }, []);

  // Filtering logic
  const filteredMovies = movies.filter((movie) => {
    const directorMatch =
      selectedDirector === "All" || movie.director === selectedDirector;
    const genreMatch = selectedGenre === "All" || movie.genre === selectedGenre;
    return directorMatch && genreMatch;
  });

  return (
    <div className="page-container">
      <div className="movie-list-header">Movies</div>
      <div className="filter-bar">
        <select
          className="filter-btn"
          value={selectedDirector}
          onChange={(e) => setSelectedDirector(e.target.value)}
        >
          {directors.map((director) => (
            <option value={director} key={director}>
              {director === "All" ? "Director" : director}
            </option>
          ))}
        </select>
        <select
          className="filter-btn"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre === "All" ? "Genre" : genre}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-list-grid">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {/* Movie Poster */}
            <img
              className="movie-poster"
              src={`http://localhost:3001/uploads/${movie.image}`}
              alt={movie.title}
            />
            {/* Movie Title */}
            <div className="movie-title">{movie.title}</div>
            {/* Movie Details */}
            <div className="movie-meta">
              Director: {movie.director} <br />
              Genre: {movie.genre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;