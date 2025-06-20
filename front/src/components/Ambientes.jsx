import React, { useState, useEffect } from 'react';
import styles from './Sensores.module.css';
import modalStyles from './Modal.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import api from '../services/axiosInstance';
import ExportButton from './ExportButton';
import { useNavigate } from 'react-router-dom';

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [ambientesOriginais, setAmbientesOriginais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);
  const [filtroSig, setFiltroSig] = useState('');

  const [form, setForm] = useState({
    sig: '',
    descricao: '',
    ni: '',
    responsavel: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    buscarAmbientes();
  }, []);

  const buscarAmbientes = async () => {
    try {
      const res = await api.get('/ambientes/');
      setAmbientes(res.data);
      setAmbientesOriginais(res.data);
    } catch (err) {
      console.error('Erro ao buscar ambientes:', err.response || err);
      toast.error('Erro ao buscar ambientes.');
      if (err.response && err.response.status === 401) {
        toast.error('Sessão expirada. Faça login novamente!');
        navigate('/login');
      }
    }
  };

  const filtrarPorSig = () => {
    if (!filtroSig.trim()) {
      setAmbientes(ambientesOriginais);
      return;
    }

    const filtrados = ambientesOriginais.filter((amb) =>
      amb.sig.toLowerCase().includes(filtroSig.trim().toLowerCase())
    );
    setAmbientes(filtrados);
  };

  const abrirModal = (ambiente = null) => {
    setModoEdicao(!!ambiente);
    setAmbienteSelecionado(ambiente);
    setForm(ambiente ? {
      sig: ambiente.sig || '',
      descricao: ambiente.descricao || '',
      ni: ambiente.ni || '',
      responsavel: ambiente.responsavel || ''
    } : {
      sig: '',
      descricao: '',
      ni: '',
      responsavel: ''
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAmbienteSelecionado(null);
    setModoEdicao(false);
    setForm({
      sig: '',
      descricao: '',
      ni: '',
      responsavel: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.sig.trim()) {
      toast.warn('Preencha o nome do ambiente (SIG).');
      return;
    }

    try {
      if (modoEdicao) {
        await api.put(`/ambientes/${ambienteSelecionado.id}/`, form);
        toast.success('Ambiente atualizado!');
      } else {
        await api.post('/ambientes/', form);
        toast.success('Ambiente criado!');
      }
      buscarAmbientes();
      fecharModal();
    } catch (err) {
      console.error('Erro ao salvar ambiente:', err.response || err);
      if (err.response && err.response.status === 401) {
        toast.error('Sua sessão expirou. Faça login novamente!');
        navigate('/login');
        return;
      }
      if (err.response && err.response.status === 400) {
        const errors = err.response.data;
        let msg = 'Erro na validação dos dados.';
        if (errors && typeof errors === 'object') {
          msg = Object.entries(errors)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join('\n');
        }
        toast.error(msg);
        return;
      }
      toast.error('Erro ao salvar ambiente.');
    }
  };

  const excluirAmbiente = async (id) => {
    if (window.confirm('Deseja excluir este ambiente?')) {
      try {
        await api.delete(`/ambientes/${id}/`);
        toast.success('Ambiente excluído!');
        buscarAmbientes();
      } catch (err) {
        console.error('Erro ao excluir ambiente:', err.response || err);
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Filtrar por SIG"
                value={filtroSig}
                onChange={(e) => setFiltroSig(e.target.value)}
                className={styles.inputFiltro}
              />
              <button onClick={filtrarPorSig} className={styles.btnFiltro}>Filtrar</button>
              <ExportButton endpoint="/api/exportar/ambientes/" filename="ambientes.xlsx" />
              <button onClick={() => abrirModal()} className={styles.btnAdd}>+ Adicionar Ambiente</button>
            </div>
          </div>

          <div className={styles.gridSensores}>
            {ambientes.length > 0 ? (
              ambientes.map((ambiente) => (
                <div key={ambiente.id} className={styles.cardSensor}>
                  <h2 className={styles.tipoSensor}>{ambiente.sig}</h2>
                  <p className={styles.info}><strong>Descrição:</strong> {ambiente.descricao || '—'}</p>
                  <p className={styles.info}><strong>NI:</strong> {ambiente.ni || '—'}</p>
                  <p className={styles.info}><strong>Responsável:</strong> {ambiente.responsavel || '—'}</p>
                  <div className={styles.actions}>
                    <button onClick={() => abrirModal(ambiente)} title="Editar" className={`${styles.btnIcon} ${styles.edit}`}>
                      <FiEdit size={20} />
                    </button>
                    <button onClick={() => excluirAmbiente(ambiente.id)} title="Excluir" className={`${styles.btnIcon} ${styles.delete}`}>
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum ambiente encontrado.</p>
            )}
          </div>

          {modalAberto && (
            <div className={modalStyles.overlay}>
              <div className={modalStyles.modal}>
                <h2>{modoEdicao ? 'Editar Ambiente' : 'Novo Ambiente'}</h2>
                <form onSubmit={handleSubmit}>
                  <label>SIG (nome curto):</label>
                  <input type="text" name="sig" value={form.sig} onChange={handleChange} required />

                  <label>Descrição:</label>
                  <textarea name="descricao" value={form.descricao} onChange={handleChange} />

                  <label>NI:</label>
                  <input type="text" name="ni" value={form.ni} onChange={handleChange} required />

                  <label>Responsável:</label>
                  <input type="text" name="responsavel" value={form.responsavel} onChange={handleChange} required />

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
