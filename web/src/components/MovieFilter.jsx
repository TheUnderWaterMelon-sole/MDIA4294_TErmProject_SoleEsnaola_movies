// MovieFilter.jsx
import React, { useState } from 'react';

const MovieFilter = ({ onFilter }) => {
  const [type, setType] = useState('genre');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(type, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="genre">Genre</option>
        <option value="director">Director</option>
      </select>
      <input
        type="text"
        placeholder={`Filter by ${type}`}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default MovieFilter;