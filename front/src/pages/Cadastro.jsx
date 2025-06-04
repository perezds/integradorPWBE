import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from './Cadastro.module.css';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
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
        </form>
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
};

export default Cadastro;
