import React, { useEffect, useState } from 'react';
import styles from './Sensores.module.css';
import axios from 'axios';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Sensores = () => {
  const [sensores, setSensores] = useState([]);
  const [formData, setFormData] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    status: true,
  });

  const tiposSensor = [
    { value: 'temperatura', label: 'Temperatura' },
    { value: 'umidade', label: 'Umidade' },
    { value: 'luminosidade', label: 'Luminosidade' },
    { value: 'contador', label: 'Contador de Pessoas' },
  ];

  useEffect(() => {
    fetchSensores();
  }, []);

  const fetchSensores = async () => {
const token = localStorage.getItem('token');

    if (!token) {
      console.warn('⚠️ Token não encontrado. Faça login primeiro!');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8000/api/sensores/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSensores(res.data);
    } catch (err) {
      console.error('❌ Erro ao buscar sensores:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.warn('⚠️ Token não encontrado. Faça login primeiro!');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/sensores/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ tipo: '', mac_address: '', latitude: '', longitude: '', status: true });
      fetchSensores();
    } catch (err) {
      console.error('❌ Erro ao cadastrar sensor:', err);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <div className={styles.container}>
          <h2 className={styles.title}>Lista de Sensores</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="">Selecione o tipo</option>
              {tiposSensor.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
              ))}
            </select>
            <input
              type="text"
              name="mac_address"
              placeholder="MAC Address"
              value={formData.mac_address}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
            <label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
              /> Ativo
            </label>
            <button type="submit" className={styles.addButton}><FaPlus /> Adicionar Sensor</button>
          </form>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>MAC Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.tipo}</td>
                  <td>{sensor.mac_address}</td>
                  <td>{sensor.latitude}</td>
                  <td>{sensor.longitude}</td>
                  <td>{sensor.status ? 'Ativo' : 'Inativo'}</td>
                  <td className={styles.actions}>
                    <FaEdit className={styles.editIcon} />
                    <FaTrash className={styles.deleteIcon} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sensores;
