// footer.jsx 
import React from 'react';
import g from '../global.module.css';

export default function Footer() {
  return (
    <footer className={g.footer}>
      <div className={g.footerLogo}>
        <span className={g.logoIcon}>🎬</span>
        <span className={g.logoTitle}>CineVerse</span>
      </div>
      <span className={g.footerCopy}>
        &copy; MDIA4294-Ass2-SoleEsnaola_2025
      </span>
    </footer>
  );
}