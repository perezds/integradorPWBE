import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import api from '../services/axiosInstance'
import headerImage from '../../images/header_image.svg';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/token/', {
        username,
        password: senha,
      });

      const { access, refresh } = response.data;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      console.log('Access Token:', access);
      console.log('Refresh Token:', refresh);

     
      navigate('/home');

    } catch (error) {
      console.error('Erro no login:', error);

      if (error.response && error.response.status === 401) {
        alert('Usuário ou senha inválidos.');
      } else {
        alert('Erro na comunicação com o servidor. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <h2>Login</h2>
        <p className={styles.subtitle}>Bem-vindo(a) de volta!</p>

        <form onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <label>Usuário:</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.icon} />
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
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
                disabled={loading}
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
              <input type="checkbox" disabled={loading} /> Lembrar de mim.
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? 'Entrando...' : 'Login'}
            </button>
            <button
              type="button"
              className={styles.registerBtn}
              onClick={handleRegister}
              disabled={loading}
            >
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
