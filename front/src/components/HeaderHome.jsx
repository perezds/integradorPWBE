import styles from './HeaderHome.module.css';
import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => {
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
        <FaBell className={styles.iconRight} title="Notificações" />

        <div className={styles.userMenu}>
          <div className={styles.userIcon}>D</div>
          <div className={styles.dropdown} role="menu">
            <a href="/perfil" role="menuitem">Perfil</a>
            <a href="/config" role="menuitem">Configurações</a>
            <a href="/sair" role="menuitem">Sair</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
