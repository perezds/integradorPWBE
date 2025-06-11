import axios from 'axios';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './Cadastro.module.css';
import { Link } from 'react-router-dom';
import headerImage from '../../images/header_image.svg';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
  
    await axios.post("http://localhost:8000/cadastro/", {
      username,
      email,
      password,
    });

   
    const res = await axios.post("http://localhost:8000/token/", {
      username,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    alert("Cadastro e login feitos com sucesso!");
    window.location.href = "/dashboard"; 

  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar. Verifique os dados.");
  }
};

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerLeft}>
        <h2>Criar Conta</h2>
        <p className={styles.subtitle}>Preencha os campos abaixo para continuar.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor="username">Usuário</label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.icon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="password">Senha</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className={styles.eye} onClick={togglePassword}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className={styles.eye} onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Criar conta.</button>
          <div className={styles.registerRedirect}>
          <p>Já possui conta? <Link to="/">Faça login.</Link></p>
        </div>
        </form>
      </div>
      <div className={styles.registerRight}>
        <div className={styles.rightContent}>
          <div className={styles.navLinks}>
            <Link to="/home">Página inicial</Link>
            <Link to="/sensores">Sensores</Link>
          </div>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
