import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>TechEdu</h1>
      <ul className={styles.navLinks}>
        <li><a href="/home">Página inicial</a></li>
        <li><a href="/sensores">Sensores</a></li>
        <li><a href="/dados">Dados</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
