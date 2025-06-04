import styles from './Sidebar.module.css';
import {
  FaTachometerAlt, FaMapMarkedAlt, FaBars,
  FaEnvelope, FaCogs, FaUser, FaQuestionCircle
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>

      <nav aria-label="Navegação principal">
        <p className={styles.section}>M E N U</p>
        <ul>
          <li><a href="/home" className={styles.active}><FaTachometerAlt /> <span>Dashboard</span></a></li>
          <li><a href="/mapa"><FaMapMarkedAlt /> <span>Mapas</span></a></li>
          <li><a href="/menu"><FaBars /> <span>Menu</span></a></li>
          <li><a href="/mensagens"><FaEnvelope /> <span>Notificações</span></a></li>
        </ul>
        <p className={styles.section}>O U T R O S</p>
        <ul>
          <li><a href="/config"><FaCogs /> <span>Configurações</span></a></li>
          <li><a href="/ajuda"><FaQuestionCircle /> <span>Ajuda</span></a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
