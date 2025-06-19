import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SettingsPage.module.css";
import Header from "./HeaderHome";
import Sidebar from "./Sidebar";
import { Settings, User, Rss, Home, Clock } from "lucide-react"; // novos ícones incluídos

const menuItems = [
  {
    title: "Perfil",
    icon: <User className={styles.icone} />,
    desc: "Informações da sua conta e usuário",
    link: "/settings/perfil",
  },
  {
    title: "Sensores",
    icon: <Rss className={styles.icone} />,
    desc: "Gerencie sensores, alertas e rede",
    link: "/settings/sensores",
  },
  {
    title: "Ambientes",
    icon: <Home className={styles.icone} />,
    desc: "Configure os espaços e locais monitorados",
    link: "/settings/ambientes",
  },
  {
    title: "Histórico",
    icon: <Clock className={styles.icone} />,
    desc: "Visualize os dados registrados ao longo do tempo",
    link: "/settings/historico",
  },
];

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <h1 className={styles.titulo}>Configurações</h1>

        <div className={styles.caixas}>
          {menuItems.map(({ title, icon, desc, link }) => (
            <div
              key={title}
              className={styles.caixa}
              onClick={() => navigate(link)}
            >
              {icon}
              <h2>{title}</h2>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
