import React from 'react';
import styles from './Profile.module.css';
import { CameraIcon } from 'lucide-react';
import Header from './HeaderHome';
import Sidebar from './Sidebar';

const ProfilePage = () => {
  return (
      <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
    <div className={styles.profileWrapper}>
      <div className={styles.coverPhoto}>
        <button className={styles.editCover}>
          <CameraIcon size={16} /> Editar foto da capa
        </button>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profilePicWrapper}>
          <img
            src="/user-avatar.jpg"
            alt="Foto de perfil"
            className={styles.profilePic}
          />
          <button className={styles.editProfilePic}>
            <CameraIcon size={16} />
          </button>
        </div>
        <div className={styles.userDetails}>
          <h1 className={styles.userName}>Duda Perez</h1>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.storyButton}>Configurações</button>
          <button className={styles.editProfile}>Editar perfil</button>
        </div>
      </div>

      <div className={styles.navBar}>
        <button className={styles.navItem}>Sensores</button>
        <button className={styles.navItem}>Geral</button>
        <button className={styles.navItem}>Alertas</button>
        <button className={styles.navItem}>Configurações</button>
        <button className={styles.navItem}>Mais</button>
      </div>

      <div className={styles.contentArea}></div>
    </div>
     </div>
      </div>
  );
};

export default ProfilePage;