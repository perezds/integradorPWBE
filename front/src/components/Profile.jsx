import React, { useState } from 'react';
import styles from './Profile.module.css';
import { CameraIcon } from 'lucide-react';
import Header from './HeaderHome';
import Sidebar from './Sidebar';

const ProfilePage = () => {
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'sensores':
        return <div className={styles.section}>Sensores</div>;
      case 'perfil':
        return <div className={styles.section}> Perfil</div>;
      case 'geral':
        return <div className={styles.section}> Visão Geral </div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <div className={styles.profileWrapper}>
          <div className={styles.coverPhoto}>
            <button className={styles.editCover}>
              <CameraIcon size={16} /> Editar Capa
            </button>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profilePicWrapper}>
              <img src="/user-avatar.jpg" alt="Perfil" className={styles.profilePic} />
              <button className={styles.editProfilePic}>
                <CameraIcon size={16} />
              </button>
            </div>
            <h1 className={styles.userName}>Duda Perez</h1>
          </div>

          <div className={styles.navBar}>
            <button
              className={`${styles.navItem} ${abaAtiva === 'perfil' ? styles.active : ''}`}
              onClick={() => setAbaAtiva('perfil')}
            >
              Perfil
            </button>
            <button
              className={`${styles.navItem} ${abaAtiva === 'sensores' ? styles.active : ''}`}
              onClick={() => setAbaAtiva('sensores')}
            >
              Sensores
            </button>
            <button
              className={`${styles.navItem} ${abaAtiva === 'geral' ? styles.active : ''}`}
              onClick={() => setAbaAtiva('geral')}
            >
              Geral
            </button>
          </div>

          <div className={styles.contentArea}>
            {renderConteudo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
