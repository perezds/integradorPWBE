import React, { useState, useEffect } from 'react';
import styles from './Sensores.module.css';
import modalStyles from './Modal.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import axios from 'axios';
import ExportButton from './ExportButton';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);
  const [form, setForm] = useState({ nome: '', descricao: '' });

  useEffect(() => {
    buscarAmbientes();
  }, []);

  const buscarAmbientes = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.error('Usuário não autenticado. Por favor, faça login.');
      return;
    }
    try {
      const res = await axios.get('/api/ambientes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmbientes(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao buscar ambientes.');
    }
  };

  const abrirModal = (ambiente = null) => {
    setModoEdicao(!!ambiente);
    setAmbienteSelecionado(ambiente);
    setForm(ambiente || { nome: '', descricao: '' });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAmbienteSelecionado(null);
    setModoEdicao(false);
    setForm({ nome: '', descricao: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    if (!form.nome) {
      toast.warn('Preencha o nome do ambiente.');
      return;
    }
    try {
      if (modoEdicao) {
        await axios.put(`/api/ambientes/${ambienteSelecionado.id}/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Ambiente atualizado!');
      } else {
        await axios.post('/api/ambientes/', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Ambiente criado!');
      }
      buscarAmbientes();
      fecharModal();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar ambiente.');
    }
  };

  const excluirAmbiente = async (id) => {
    if (window.confirm('Deseja excluir este ambiente?')) {
      const token = localStorage.getItem('access');
      try {
        await axios.delete(`/api/ambientes/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Ambiente excluído!');
        buscarAmbientes();
      } catch (err) {
        console.error(err);
        toast.error('Erro ao excluir ambiente.');
      }
    }
  };

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Ambientes</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ExportButton endpoint="/api/ambientes/" filename="ambientes.xlsx" />
              <button onClick={() => abrirModal()} className={styles.btnAdd}>+ Adicionar Ambiente</button>
            </div>
          </div>

          <div className={styles.gridSensores}>
            {ambientes.map((ambiente) => (
              <div key={ambiente.id} className={styles.cardSensor}>
                <h2 className={styles.tipoSensor}>{ambiente.nome}</h2>
                <p className={styles.info}><strong>Descrição:</strong> {ambiente.descricao}</p>
                <div className={styles.actions}>
                  <button onClick={() => abrirModal(ambiente)} title="Editar" className={`${styles.btnIcon} ${styles.edit}`}><FiEdit size={20} /></button>
                  <button onClick={() => excluirAmbiente(ambiente.id)} title="Excluir" className={`${styles.btnIcon} ${styles.delete}`}><FiTrash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>

          {modalAberto && (
            <div className={modalStyles.overlay}>
              <div className={modalStyles.modal}>
                <h2>{modoEdicao ? 'Editar Ambiente' : 'Novo Ambiente'}</h2>
                <form onSubmit={handleSubmit}>
                  <label>Nome:</label>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
                  <label>Descrição:</label>
                  <textarea name="descricao" value={form.descricao} onChange={handleChange} />
                  <div className={modalStyles.actions}>
                    <button type="submit" className={modalStyles.salvar}>Salvar</button>
                    <button type="button" onClick={fecharModal} className={modalStyles.cancelar}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ambientes;
