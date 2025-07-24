// Header.jsx
import React from 'react';
import { Link } from 'react-router';
import g from '../global.module.css';

export default function Header() {
  return (
    <header className={g.navbar}>
      <div className={g.logo}>
        <span className={g.logoIcon}>🎬</span>
        <span className={g.logoTitle}>CineVerse</span>
      </div>
      <nav className={g.navLinks}>
        <Link to="/" className={g.navLink}>Movies</Link>
        <a href="#" className={g.navLink}>TV Shows</a>
        <span className={g.navLink}>Blog</span>
      </nav>
    </header>
  );
}