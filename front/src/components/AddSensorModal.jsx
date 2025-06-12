import React, { useState } from 'react';
import styles from './Modal.module.css';
import { toast } from 'react-toastify';

const AddSensorModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tipo: '',
    mac_address: '',
    latitude: '',
    longitude: '',
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tipo || !formData.mac_address) {
      toast.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Adicionar Sensor</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo*:
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="temperatura">Temperatura</option>
              <option value="umidade">Umidade</option>
              <option value="luminosidade">Luminosidade</option>
              <option value="contador">Contador de Pessoas</option>
            </select>
          </label>

          <label>
            MAC Address*:
            <input
              type="text"
              name="mac_address"
              value={formData.mac_address}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Latitude:
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              step="any"
            />
          </label>

          <label>
            Longitude:
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              step="any"
            />
          </label>

          <label className={styles.switchLabel}>
            Ativo:
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
          </label>

          <div className={styles.actions}>
            <button type="submit" className={styles.save}>Salvar</button>
            <button type="button" className={styles.cancel} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorModal;
