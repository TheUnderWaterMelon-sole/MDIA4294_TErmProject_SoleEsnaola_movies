import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
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

  const filteredMovies = movies.filter((movie) => {
    const directorMatch =
      selectedDirector === "All" || movie.director === selectedDirector;
    const genreMatch = selectedGenre === "All" || movie.genre === selectedGenre;
    return directorMatch && genreMatch;
  });

  // Handler to clear both filters
  const handleClearFilters = () => {
    setSelectedDirector("All");
    setSelectedGenre("All");
  };

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
        <button
          className="filter-btn"
          style={{ marginLeft: "1rem" }}
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      <div className="movie-list-grid">
        {filteredMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none" }}>
            <div className="movie-card">
              <img
                className="movie-poster"
                src={`http://localhost:3001/images/${movie.image}`}
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
              <div className="movie-meta">
                Director: {movie.director} <br />
                Genre: {movie.genre}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
