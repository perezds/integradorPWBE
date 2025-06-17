import { useState, useEffect, useRef } from 'react';
import styles from './HeaderHome.module.css';
import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.topBar}>
      <div className={styles.searchWrapper}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Pesquisar..."
          className={styles.searchInput}
          aria-label="Campo de pesquisa"
        />
      </div>

      <div className={styles.actions}>
      <div className={styles.userMenu} ref={menuRef}>
          <div
            className={styles.userIcon}
            onClick={() => setOpen((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          >
            D
          </div>

          {open && (
            <div className={styles.dropdown} role="menu">
              <a href="/settings/perfil" role="menuitem">Perfil</a>
              <a href="/settings" role="menuitem">Configurações</a>
              <a href="/" role="menuitem">Sair</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
