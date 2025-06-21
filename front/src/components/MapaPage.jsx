import React from 'react';
import styles from './MapaPage.module.css';
import { motion } from 'framer-motion';
import { MapPin, Cpu, Activity, Trophy, Bot } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Header from './HeaderHome';
import Sidebar from './Sidebar';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Dados de exemplo para gráficos
const sensoresAtivosData = [
  { name: 'Sala 101', sensores: 6 },
  { name: 'Laboratório', sensores: 7 },
  { name: 'Bloco B', sensores: 5 },
  { name: 'Refeitório', sensores: 6 },
];

const temperaturaData = [
  { name: '01/05', temp: 28, pico: 30 },
  { name: '02/05', temp: 29, pico: 31 },
  { name: '03/05', temp: 27, pico: 29 },
  { name: '04/05', temp: 31, pico: 33 },
  { name: '05/05', temp: 30, pico: 36.4 },
];

// Componente para forçar o mapa a se ajustar à tela (refresh do Leaflet)
function MapResize() {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function MapaPage() {
  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />

        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>Visão Panorâmica</h1>
          </motion.div>

          <motion.div
            className={styles.statusGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.card}>
              <Cpu className={styles.iconBlue} />
              <div>
                <h2 className={styles.cardTitle}>Sensores Totais</h2>
                <p className={styles.cardText}>24 unidades</p>
              </div>
            </div>
            <div className={styles.card}>
              <Activity className={styles.iconGreen} />
              <div>
                <h2 className={styles.cardTitle}>Ativos</h2>
                <p className={styles.cardText}>20 sensores</p>
              </div>
            </div>
            <div className={styles.card}>
              <Activity className={styles.iconRed} />
              <div>
                <h2 className={styles.cardTitle}>Inativos</h2>
                <p className={styles.cardText}>4 sensores</p>
              </div>
            </div>
            <div className={styles.card}>
              <MapPin className={styles.iconPurple} />
              <div>
                <h2 className={styles.cardTitle}>Última Atualização</h2>
                <p className={styles.cardText}>há 5 minutos</p>
              </div>
            </div>
          </motion.div>

          {/* Mapa responsivo e estiloso */}
          <motion.div
            className={styles.mapContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MapContainer
              center={[-23.5505, -46.6333]}
              zoom={17}
              scrollWheelZoom={false}
              className={styles.leafletMap}
            >
              <MapResize />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-23.5505, -46.6333]}>
                <Popup>Escola Central - Sensor Principal</Popup>
              </Marker>
            </MapContainer>
          </motion.div>

   
          <motion.div
            className={styles.analyticsSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={styles.sectionTitle}>Indicadores e Informações</h2>

            <div className={styles.analyticsGrid}>
              <div className={`${styles.analyticsCard} ${styles.blue}`}>
                <Activity size={20} />
                <span>Sensores mais ativos:</span>
                <strong>Sala 101, Laboratório</strong>

                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={sensoresAtivosData} margin={{ top: 5, bottom: 5 }}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="sensores" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={`${styles.analyticsCard} ${styles.red}`}>
                <Cpu size={20} />
                <span>Pico de temperatura:</span>
                <strong>36.4°C (05/05/2025)</strong>

                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={temperaturaData} margin={{ top: 5, bottom: 5 }}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={20} />
                    <Line type="monotone" dataKey="temp" stroke="#ef4444" name="Temperatura Média" strokeWidth={2} />
                    <Line type="monotone" dataKey="pico" stroke="#b91c1c" name="Pico de Temperatura" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={`${styles.analyticsCard} ${styles.purple}`}>
                <MapPin size={20} />
                <span>Setores com mais atividade:</span>
                <strong>Bloco B, Refeitório</strong>
              </div>

              <div className={`${styles.analyticsCard} ${styles.yellow}`}>
                <Trophy size={20} />
                <span>Incidentes registrados:</span>
                <strong>3 alertas de superaquecimento</strong>
              </div>

              <div className={`${styles.analyticsCard} ${styles.green}`}>
                <Activity size={20} />
                <span>Energia economizada:</span>
                <strong>15 kWh</strong>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}