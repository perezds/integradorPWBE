import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Modal from '@/components/Modal';
import styles from './DashboardGraficos.module.css';

const dataTemperatura = [
  { hora: '00h', temp: 21 },
  { hora: '04h', temp: 20 },
  { hora: '08h', temp: 22 },
  { hora: '12h', temp: 26 },
  { hora: '16h', temp: 28 },
  { hora: '20h', temp: 24 },
  { hora: '23h', temp: 22 },
];

export default function DashboardGraficos() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Gráfico de Temperatura (últimas 24h)</h2>

      <div className={styles.card} onClick={() => setModalAberto(true)}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataTemperatura}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis domain={[18, 30]} />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#6D28D9" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Modal open={modalAberto} onClose={() => setModalAberto(false)}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitulo}>Detalhes da Temperatura</h3>
          <p className={styles.modalTexto}>Aqui você pode mostrar médias, alertas, variações e outras análises inteligentes dos dados de temperatura.</p>
        </div>
      </Modal>
    </div>
  );
}
