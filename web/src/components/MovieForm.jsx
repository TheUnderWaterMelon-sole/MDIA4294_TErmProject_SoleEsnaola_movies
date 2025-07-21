import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, image, director, genre })
    })
    .then(res => res.json())
    .then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Image filename" value={image} onChange={e => setImage(e.target.value)} required />
      <input placeholder="Director" value={director} onChange={e => setDirector(e.target.value)} required />
      <input placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default MovieForm;