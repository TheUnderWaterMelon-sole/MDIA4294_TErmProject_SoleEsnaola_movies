// Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-logo">
        <span className="logo-icon">🎬</span>
        <span className="logo-title">CineVerse</span>
      </div>
      <nav className="header-nav">
        <a href="/" className="nav-link">Movies</a>
        <a href="#" className="nav-link">TV Shows</a>
        <span className="nav-link blog-link">Blog</span>
      </nav>
      <div className="header-search">
        <input type="text" className="search-input" placeholder="Search" disabled />
      </div>
    </header>
  );
}