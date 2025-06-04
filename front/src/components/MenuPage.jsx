import styles from './MenuPage.module.css';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import { FaTachometerAlt, FaMapMarkedAlt, FaEnvelope, FaCogs, FaUserAlt, FaQuestionCircle } from 'react-icons/fa';

export default function Menu() {
  const menuItems = [
    { title: 'Dashboard', icon: <FaTachometerAlt />, desc: 'Resumo em tempo real dos sensores.', link: '/home' },
    { title: 'Mapas', icon: <FaMapMarkedAlt />, desc: 'Visualização dos sensores no mapa.', link: '/mapas' },
    { title: 'Notificações', icon: <FaEnvelope />, desc: 'Avisos e alertas.', link: '/mensagens' },
    { title: 'Configurações', icon: <FaCogs />, desc: 'Ajuste o sistema conforme necessário.', link: '/configuracoes' },
    { title: 'Contas', icon: <FaUserAlt />, desc: 'Gerenciamento de usuários.', link: '/profile' },
    { title: 'Ajuda', icon: <FaQuestionCircle />, desc: 'Central de ajuda e FAQ.', link: '/ajuda' }
  ];

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <h2 className={styles.menuTitle}>Menu</h2>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <a href={item.link} className={styles.menuCard} key={index}>
              <div className={styles.menuIcon}>{item.icon}</div>
              <div className={styles.menuCardTitle}>{item.title}</div>
              <div className={styles.menuCardDesc}>{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
