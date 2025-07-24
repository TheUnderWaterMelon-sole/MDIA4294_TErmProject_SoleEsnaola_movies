// MovieFilter.jsx
import React, { useState } from 'react';
import styles from '../pages/MovieList.module.css';

const MovieFilter = ({ onFilter }) => {
  const [type, setType] = useState('genre');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(type, value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <select 
        value={type} 
        onChange={e => setType(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="genre">Genre</option>
        <option value="director">Director</option>
      </select>
      <input
        type="text"
        placeholder={`Filter by ${type}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={styles.filterInput}
      />
      <button type="submit" className={styles.filterButton}>Filter</button>
    </form>
  );
};

export default MovieFilter;