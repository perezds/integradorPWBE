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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        email: email,
        password: senha,
      });

      const token = response.data.access;
      localStorage.setItem('token', token);

      console.log('✅ Login bem-sucedido! Token salvo!');
      navigate('/home');
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      alert('Email ou senha inválidos. Tenta de novo, minha consagrada.');
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

        <div className={styles.inputBox}>
          <label>Email institucional:</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input
              type="user"
              placeholder="lin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <a href="#">Esqueceu a senha?</a>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>
          <button className={styles.registerBtn} onClick={handleRegister}>
            Cadastro
          </button>
        </div>

        <div className={styles.signupSuggestion}>
          <span>Não tem uma conta?</span>
          <Link to="/cadastro" className={styles.signupLink}>
            Cadastrar conta
          </Link>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.rightContent}>
          <div className={styles.navLinks}>
            <Link to="/home">Página inicial</Link>
            <Link to="/settings/sensores">Sensores</Link>
          </div>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
}
