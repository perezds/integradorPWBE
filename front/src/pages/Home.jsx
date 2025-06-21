import styles from './Home.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/HeaderHome';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const generateRandomData = () => {
  const hours = ['00h', '04h', '08h', '12h', '16h', '20h', '23h'];
  return hours.map((hour) => ({
    name: hour,
    temp: Math.floor(18 + Math.random() * 10), 
    umid: Math.floor(40 + Math.random() * 40), 
  }));
};

const Home = () => {
  const [mockData, setMockData] = useState(generateRandomData());

  useEffect(() => {
    
    const interval = setInterval(() => {
      setMockData(generateRandomData());
    }, 5000);


    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.menuContainer}>
      <Sidebar />
      <div className={styles.menuContent}>
        <Header />
        <main className={styles.main}>
          <div className={styles.sectionTitle}>Smart City Senai</div>

          <div className={styles.alertBox}>
            <span>
              É possível que haja chuva leve com ventos fortes esta manhã por volta das 10:00 WIB.
            </span>
          </div>

          <div className={styles.cardsRow}>
            <div className={styles.card}>
              <p>Temperatura</p>
              <h3>26°C</h3>
              <span>+8%</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#8884d8"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.card}>
              <p>Umidade</p>
              <h3>59%</h3>
              <span>-11%</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="umid"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.card}>
              <p>Energia Consumida</p>
              <h3>84.3 kWh</h3>
              <span>+5% que ontem</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#ffc658"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.card}>
              <p>CO₂ Atual</p>
              <h3>850 ppm</h3>
              <span>&lt; 1000 ppm</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="umid"
                    stroke="#ff7300"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.card}>
              <p>Pessoas na Sala</p>
              <h3>12</h3>
              <span>Máx: 20</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#0088fe"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.card}>
              <p>Nível de Ruído</p>
              <h3>54 dB</h3>
              <span>Dentro do aceitável</span>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={mockData}>
                  <Line
                    type="monotone"
                    dataKey="umid"
                    stroke="#00c49f"
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Variação Temporal</h2>

          <div className={styles.variationRow}>
            <div className={`${styles.variationCard} ${styles.green}`}>
              <p>Temperatura Atual</p>
              <h3>18°C</h3>
              <span>Limite ideal: 18~26°C</span>
            </div>
            <div className={`${styles.variationCard} ${styles.red}`}>
              <p>Umidade Atual</p>
              <h3>90%</h3>
              <span>Limite ideal: 40~60%</span>
            </div>
            <div className={`${styles.variationCard} ${styles.purple}`}>
              <p>Temp. (últimas 24h)</p>
              <h3>30°C</h3>
              <span>4% acima do previsto</span>
            </div>
            <div className={`${styles.variationCard} ${styles.purple}`}>
              <p>Umid. (últimas 24h)</p>
              <h3>70%</h3>
              <span>+30% do ideal</span>
            </div>
          </div>

          <div className={styles.bigGraphContainer}>
            <h2 className={styles.sectionTitle}>Gráfico Geral de Temperatura</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Temperatura"
                />
                <Line
                  type="monotone"
                  dataKey="umid"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Umidade"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
