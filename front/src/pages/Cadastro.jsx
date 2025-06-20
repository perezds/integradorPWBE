import axios from 'axios';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Ops! As senhas não coincidem, dá uma revisada.");
      return;
    }

    try {
      const cadastroRes = await axios.post('http://localhost:8000/api/cadastro/', {
        username,
        email,
        password,
      });

      if (cadastroRes.status === 201 || cadastroRes.status === 200) {
        const loginRes = await axios.post("http://localhost:8000/api/token/", {
          username,
          password,
        });

        localStorage.setItem("access", loginRes.data.access);
        localStorage.setItem("refresh", loginRes.data.refresh);

        alert("Cadastro e login realizados com sucesso! Bem-vindo(a) ao dashboard.");
        navigate("/home");
      } else {
        alert("Erro inesperado no cadastro. Tenta de novo, vai?");
        console.error("Resposta inesperada no cadastro:", cadastroRes);
      }
    } catch (error) {
      console.error("Erro no cadastro/login:", error);

      if (error.response) {
        switch (error.response.status) {
          case 409:
            alert("Ops, esse usuário ou email já estão em uso.");
            break;
          case 400:
            alert("Parece que algum dado está inválido. Confere aí.");
            break;
          default:
            alert(`Erro inesperado: código ${error.response.status}.`);
        }
      } else {
        alert("Erro de conexão. Verifica sua internet ou o servidor.");
      }
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
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Digite seu usuário"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.icon} />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="password">Senha</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                autoComplete="new-password"
              />
              <span className={styles.eye} onClick={togglePassword} title={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                required
                autoComplete="new-password"
              />
              <span className={styles.eye} onClick={toggleConfirmPassword} title={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}>
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Criar conta</button>

          <div className={styles.registerRedirect}>
            <p>Já possui conta? <Link to="/">Faça login.</Link></p>
          </div>
        </form>
      </div>

      <div className={styles.registerRight}>
        <div className={styles.rightContent}>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
