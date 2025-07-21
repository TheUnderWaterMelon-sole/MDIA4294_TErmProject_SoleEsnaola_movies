// MovieLiest.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieFilter from './MovieFilter';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = (type, value) => {
    if (!value) {
      setFiltered(movies);
      return;
    }
    setFiltered(movies.filter(m => m[type].toLowerCase().includes(value.toLowerCase())));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/movies/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      setFiltered(filtered.filter(m => m.id !== id));
      setMovies(movies.filter(m => m.id !== id));
    });
  };

  return (
    <div>
      <h2>All Movies</h2>
      <MovieFilter onFilter={handleFilter} />
      <Link to="/add">Add Movie</Link>
      <ul>
        {filtered.map(movie => (
          <li key={movie.id}>
            <img src={`/images/${movie.image}`} alt={movie.title} width="100" />
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
            <Link to={`/edit/${movie.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;