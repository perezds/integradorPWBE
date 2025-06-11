import React from 'react';
import styles from './sensores.module.css';

const ModalSensores = ({ isOpen, onClose, onSubmit, formData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Adicionar Novo Sensor</h3>

        <form onSubmit={onSubmit} className={styles.modalForm}>
          <label>
            Tipo:
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            MAC Address:
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
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Longitude:
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Ativo
          </label>

          <div className={styles.modalActions}>
            <button type="submit" className={styles.confirmBtn}>Salvar</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSensores;
