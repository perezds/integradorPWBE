import React, { useState, useEffect } from 'react';
import styles from './Sensores.module.css';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import axios from 'axios';
import ExportButton from './ExportButton';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const Historico = () => {
  const [historicos, setHistoricos] = useState([]);

  useEffect(() => {
    buscarHistoricos();
  }, []);

  const buscarHistoricos = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;

    try {
      const res = await axios.get('/api/historico/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistoricos(res.data);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Histórico</h1>
            <ExportButton endpoint="/api/exportar/historico/" filename="historico.xlsx" />
          </div>

          <div className={styles.gridSensores} style={{ gridTemplateColumns: '1fr' }}>
            {historicos.length > 0 ? (
              historicos.map((item) => (
                <div key={item.id} className={styles.cardSensor}>
                  <p><strong>Data:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                  <p><strong>Sensor:</strong> {item.sensor.tipo}</p>
                  <p><strong>Ambiente:</strong> {item.ambiente.sig}</p>
                  <p><strong>Valor:</strong> {item.valor}</p>
                </div>
              ))
            ) : (
              <p>Nenhum dado de histórico encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historico;
