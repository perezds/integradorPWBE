import React, { useState } from 'react';
import { Edit3, Trash2, Save, ArrowRightCircle, ActivitySquare, Building2, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './HeaderHome';
import styles from './Profile.module.css';

export default function Profile() {
  const [abaAtiva, setAbaAtiva] = useState('perfil');
  const [nome, setNome] = useState('Maria E. Perez');
  const [bio, setBio] = useState('');
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // Simulação de contadores (substitua depois pelos dados reais do backend)
  const sensoresAtivos = 12;
  const ambientesAtivos = 5;
  const historicoRegistros = 83;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditando(false);
    setMensagem('Alterações salvas com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  const renderConteudo = () => {
    if (abaAtiva === 'geral') return <div className={styles.section}>Visão geral com informações resumidas do sistema.</div>;

    if (abaAtiva === 'perfil') {
      return (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              disabled={!editando}
            />
          </label>
          <label>
            Biografia
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você"
              disabled={!editando}
            />
          </label>
          {editando && (
            <button type="submit" className={styles.saveButton}>
              <Save size={16} /> Salvar Alterações
            </button>
          )}
          {mensagem && <p className={styles.successMessage}>{mensagem}</p>}
        </form>
      );
    }

    if (abaAtiva === 'sensores') {
      return (
        <div className={styles.cardContainer}>
          <div className={styles.card} onClick={() => navigate('/settings/sensores')}>
            <div className={styles.cardIcon}><ActivitySquare size={36} /></div>
            <div className={styles.cardContent}>
              <h3>Sensores</h3>
              <p>{sensoresAtivos} sensores cadastrados</p>
            </div>
            <ArrowRightCircle size={24} className={styles.cardArrow} />
          </div>
          <div className={styles.card} onClick={() => navigate('/settings/ambientes')}>
            <div className={styles.cardIcon}><Building2 size={36} /></div>
            <div className={styles.cardContent}>
              <h3>Ambientes</h3>
              <p>{ambientesAtivos} ambientes monitorados</p>
            </div>
            <ArrowRightCircle size={24} className={styles.cardArrow} />
          </div>
          <div className={styles.card} onClick={() => navigate('/settings/historico')}>
            <div className={styles.cardIcon}><History size={36} /></div>
            <div className={styles.cardContent}>
              <h3>Histórico</h3>
              <p>{historicoRegistros} registros armazenados</p>
            </div>
            <ArrowRightCircle size={24} className={styles.cardArrow} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />

        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.avatar}>D</div>

            <div className={styles.actionButtons}>
              {!editando ? (
                <button title="Editar" onClick={() => setEditando(true)} className={styles.editBtn}>
                  <Edit3 size={16} /> Editar
                </button>
              ) : (
                <button title="Cancelar" onClick={() => setEditando(false)} className={styles.cancelBtn}>
                  Cancelar
                </button>
              )}
              <button title="Remover" className={styles.removeBtn}>
                <Trash2 size={16} /> Remover
              </button>
            </div>
          </header>

          <div className={styles.contentArea}>
            <nav className={styles.tabs}>
              <button
                className={abaAtiva === 'geral' ? styles.active : ''}
                onClick={() => setAbaAtiva('geral')}
              >
                Geral
              </button>
              <button
                className={abaAtiva === 'perfil' ? styles.active : ''}
                onClick={() => setAbaAtiva('perfil')}
              >
                Perfil
              </button>
              <button
                className={abaAtiva === 'sensores' ? styles.active : ''}
                onClick={() => setAbaAtiva('sensores')}
              >
                Monitoramento
              </button>
            </nav>

            <section className={styles.tabContent}>{renderConteudo()}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
