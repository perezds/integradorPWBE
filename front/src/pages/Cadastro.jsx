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

  // Toggle visualização das senhas com ícones intuitivos
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Atualiza o state dinamicamente conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função mestre que comanda o cadastro + login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    // Validação imediata: as senhas precisam casar como versos na poesia do código
    if (password !== confirmPassword) {
      alert("Ops! As senhas não coincidem, dá uma revisada.");
      return;
    }

    try {
      // Primeiro ato: cadastrar usuário
      const cadastroRes = await axios.post('http://localhost:8000/api/cadastro/', {
        username,
        email,
        password,
      });

      // Se o backend respondeu com sucesso (201 criado ou 200 ok), seguimos
      if (cadastroRes.status === 201 || cadastroRes.status === 200) {
        // Segundo ato: login automático pós-cadastro, experiência smooth
        const loginRes = await axios.post("http://localhost:8000/api/token/", {
          username,
          password,
        });

        // Guarda os tokens que nos permitem conquistar o reino digital
        localStorage.setItem("access", loginRes.data.access);
        localStorage.setItem("refresh", loginRes.data.refresh);

        alert("Cadastro e login realizados com sucesso! Bem-vindo(a) ao dashboard.");
        navigate("/home");
      } else {
        alert("Erro inesperado no cadastro. Tenta de novo, vai?");
        console.error("Resposta inesperada no cadastro:", cadastroRes);
      }

    } catch (error) {
      // Tratamento de erro robusto e empático: entenda o que o servidor diz
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

          {/* Campo usuário com ícone */}
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

          {/* Campo email com validação nativa do HTML5 */}
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

          {/* Campo senha com toggle de visibilidade */}
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

          {/* Confirmação da senha, pra garantir que ninguém vai se perder no labirinto */}
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

          {/* Botão de submissão do formulário */}
          <button type="submit" className={styles.submitButton}>Criar conta</button>

          {/* Link para retornar ao login */}
          <div className={styles.registerRedirect}>
            <p>Já possui conta? <Link to="/">Faça login.</Link></p>
          </div>
        </form>
      </div>

      {/* Lado direito com imagem decorativa */}
      <div className={styles.registerRight}>
        <div className={styles.rightContent}>
          <img src={headerImage} alt="Ideia brilhante" />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
