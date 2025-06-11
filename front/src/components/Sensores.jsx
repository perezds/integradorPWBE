import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Sensores.module.css';
import ModalSensores from './ModalSensores';

const Sensores = () => {
  const [sensores, setSensores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    status: false
  });

  const fetchSensores = async () => {
    try {
      const response = await axios.get('/api/sensores/');
      setSensores(response.data);
    } catch (error) {
      console.error('Erro ao buscar sensores:', error);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ tipo: '', mac_address: '', latitude: '', longitude: '', status: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sensores/', formData);
      fetchSensores();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao adicionar sensor:', error);
    }
  };

  return (
    <div className={styles.sensorContainer}>
      <h2>Sensores</h2>
      <button onClick={handleOpenModal} className={styles.addSensorButton}>+ Adicionar Sensor</button>

      <table className={styles.sensorTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>MAC</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sensores.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.tipo}</td>
              <td>{sensor.mac_address}</td>
              <td>{sensor.latitude}</td>
              <td>{sensor.longitude}</td>
              <td>{sensor.status ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalSensores
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Sensores;
