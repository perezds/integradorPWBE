import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import axios from 'axios';
import headerImage from '../../images/header_image.svg';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/token/", {
        username: email,
        password: senha
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard";

    } catch {
      alert("Usuário ou senha inválidos.");
    }
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <h2>Login</h2>
        <p className={styles.subtitle}>Bem-vindo(a) de volta!</p>

        <form onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <label>Email institucional:</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.icon} />
              <input
                type="text"
                placeholder="lin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label>Senha:</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="•••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <FiEye
                className={`${styles.icon} ${styles.eye}`}
                onClick={toggleSenha}
                title="Mostrar/ocultar senha"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className={styles.remember}>
            <label>
              <input type="checkbox" /> Lembrar de mim.
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
            <button type="button" className={styles.registerBtn} onClick={handleRegister}>
              Cadastro
            </button>
          </div>
        </form>

        <div className={styles.signupSuggestion}>
          <span>Não tem uma conta?</span>
          <Link to="/cadastro" className={styles.signupLink}>
            Cadastrar conta
          </Link>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.rightContent}>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
}
