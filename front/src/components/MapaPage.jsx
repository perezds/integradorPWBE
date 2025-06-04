import React from 'react';
import styles from './MapaPage.module.css';
import { motion } from 'framer-motion';
import { MapPin, Cpu, Activity, Trophy, Bot } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Header from './HeaderHome';
import Sidebar from './Sidebar';

export default function MapaPage() {
  return (
    <div className={styles.menuContainer}>
    <Sidebar />
    <div className={styles.menuContent}>
      <Header />

    <div className={styles.container}>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>Visão Panorâmica</h1>
      </motion.div>

      <motion.div className={styles.statusGrid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
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

   
      <motion.div className={styles.mapContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <MapContainer center={[-23.5505, -46.6333]} zoom={17} scrollWheelZoom={false} style={{ height: '400px', width: '100%', borderRadius: '1.5rem' }}>
          <TileLayer
            attribution='&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-23.5505, -46.6333]}>
            <Popup>Escola Central - Sensor Principal</Popup>
          </Marker>
        </MapContainer>
      </motion.div>


      <motion.div className={styles.analyticsSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className={styles.sectionTitle}>Indicadores e Informações</h2>
            <div className={styles.analyticsGrid}>
                <div className={`${styles.analyticsCard} ${styles.blue}`}>
                <Activity size={20} />
                <span>Sensores mais ativos:</span>
                <strong>Sala 101, Laboratório</strong>
                </div>
                <div className={`${styles.analyticsCard} ${styles.red}`}>
                <Cpu size={20} />
                <span>Pico de temperatura:</span>
                <strong>36.4°C (05/05/2025)</strong>
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
      <motion.div className={styles.gamification} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className={styles.sectionTitle}>Conquistas do Projeto</h2>
        <div className={styles.badges}>
          <span className={styles.badge}><Trophy className={styles.badgeIconYellow} /> Primeiros 10 sensores ativados</span>
          <span className={styles.badge}><Trophy className={styles.badgeIconBlue} /> Rede 100% operacional</span>
          <span className={styles.badge}><Trophy className={styles.badgeIconGreen} /> Engajamento estudantil</span>
        </div>
      </motion.div>


      <motion.div className={styles.aiSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className={styles.cardDashed}>
          <Bot className={styles.iconGray} />
          <div>
            <h2 className={styles.cardTitle}>Espaço reservado para IA & automação</h2>
            <p className={styles.cardText}>Em breve: sugestões automáticas, previsões e muito mais.</p>
          </div>
        </div>
      </motion.div>
    </div>
    </div>
    </div>
  );
}
