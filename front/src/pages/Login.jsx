import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import headerImage from '../../images/header_image.svg';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <h2>Login</h2>
        <p className={styles.subtitle}>Bem-vindo(a) de volta!</p>

        <div className={styles.inputBox}>
          <label>Email institucional:</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input type="email" placeholder="dudasperez@gmail.com" />
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Senha:</label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="••••••••" />
            <FiEye className={`${styles.icon} ${styles.eye}`} />
          </div>
        </div>

        <div className={styles.remember}>
          <label>
            <input type="checkbox" /> Lembrar de mim.
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
          <button className={styles.registerBtn} onClick={handleRegister}>Cadastro</button>
        </div>

        {/* Bloco de sugestão de cadastro */}
        <div className={styles.signupSuggestion}>
          <span>Não tem uma conta?</span>
          <Link to="/cadastro" className={styles.signupLink}>Cadastrar conta</Link>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.rightContent}>
          <div className={styles.navLinks}>
            <Link to="/home">Página inicial</Link>
            <Link to="/sensores">Sensores</Link>
            <Link to="/dados">Dados</Link>
          </div>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
}
