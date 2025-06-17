// Sensores.jsx
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

const token = localStorage.getItem("token")
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const Sensores = () => {
  const [sensores, setSensores] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [sensorSelecionado, setSensorSelecionado] = useState(null);
  const [form, setForm] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    status: true,
  });

  useEffect(() => {
    buscarSensores();
  }, []);

  const buscarSensores = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.error('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      const res = await axios.get('/api/sensores/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSensores(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao buscar sensores.');
    }
  };

  const abrirModal = (sensor = null) => {
    setModoEdicao(!!sensor);
    setSensorSelecionado(sensor);
    setForm(sensor || {
      tipo: '',
      mac_address: '',
      latitude: '',
      longitude: '',
      status: true,
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setSensorSelecionado(null);
    setModoEdicao(false);
    setForm({
      tipo: '',
      mac_address: '',
      latitude: '',
      longitude: '',
      status: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tipo || !form.mac_address) {
      toast.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    const token = localStorage.getItem('access');

    try {
      if (modoEdicao) {
        await axios.put(`/api/sensores/${sensorSelecionado.id}/`, form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Sensor atualizado!');
      } else {
        await axios.post('/api/sensores/', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Sensor criado!');
      }

      buscarSensores();
      fecharModal();
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar sensor.');
    }
  };
  console.log(sensorSelecionado)

  const excluirSensor = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este sensor?')) {
      const token = localStorage.getItem('access');
      try {
        await axios.delete(`/api/sensores/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Sensor excluído!');
        buscarSensores();
      } catch (err) {
        console.error(err);
        toast.error('Erro ao excluir sensor.');
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
            <h1 className={styles.title}>Sensores</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ExportButton />
              <button onClick={() => abrirModal()} className={styles.btnAdd}>
                + Adicionar Sensor
              </button>
            </div>
          </div>

          <div className={styles.gridSensores}>
            {Array.isArray(sensores) && sensores.map(sensor => (
              <div
                key={sensor.id}
                className={styles.cardSensor}
                style={{ borderColor: sensor.status ? '#16a34a' : '#dc2626' }}
              >
                <h2 className={styles.tipoSensor}>{sensor.tipo}</h2>
                <p className={styles.info}><strong>MAC:</strong> {sensor.mac_address}</p>
                <p className={styles.info}><strong>Localização:</strong> {sensor.latitude}, {sensor.longitude}</p>
                <p className={sensor.status ? styles.statusAtivo : styles.statusInativo}>
                  <strong>Status:</strong> {sensor.status ? 'Ativo' : 'Inativo'}
                </p>
                <div className={styles.actions}>
                  <button onClick={() => abrirModal(sensor)} title="Editar" className={`${styles.btnIcon} ${styles.edit}`}>
                    <FiEdit size={20} />
                  </button>
                  <button onClick={() => excluirSensor(sensor.id)} title="Excluir" className={`${styles.btnIcon} ${styles.delete}`}>
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {modalAberto && (
            <div className={modalStyles.overlay}>
              <div className={modalStyles.modal}>
                <h2>{modoEdicao ? 'Editar Sensor' : 'Novo Sensor'}</h2>
                <form onSubmit={handleSubmit}>
                  <label>Tipo:</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    <option value="temperatura">Temperatura</option>
                    <option value="umidade">Umidade</option>
                    <option value="luminosidade">Luminosidade</option>
                    <option value="contador">Contador de Pessoas</option>
                  </select>

                  <label>MAC Address:</label>
                  <input
                    type="text"
                    name="mac_address"
                    value={form.mac_address}
                    onChange={handleChange}
                    required
                  />

                  <label>Latitude:</label>
                  <input
                    type="number"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    step="any"
                    required
                  />

                  <label>Longitude:</label>
                  <input
                    type="number"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    step="any"
                    required
                  />

                  <label className={modalStyles.switchLabel}>
                    <input
                      type="checkbox"
                      name="status"
                      checked={form.status}
                      onChange={handleChange}
                    />
                    Ativo
                  </label>

                  <div className={modalStyles.actions}>
                    <button type="submit" className={modalStyles.salvar}>
                      Salvar
                    </button>
                    <button type="button" onClick={fecharModal} className={modalStyles.cancelar}>
                      Cancelar
                    </button>
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

export default Sensores;