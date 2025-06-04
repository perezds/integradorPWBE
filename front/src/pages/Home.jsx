import styles from './Home.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/HeaderHome';
import MapaEscola from '../components/MapaEscola';


const Home = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.contentArea}>
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
            </div>
            <div className={styles.card}>
              <p>Umidade</p>
              <h3>59%</h3>
              <span>-11%</span>
            </div>
            <div className={styles.card}>
              <p>Energia Consumida</p>
              <h3>84.3 kWh</h3>
              <span>+5% que ontem</span>
            </div>
            <div className={styles.card}>
              <p>CO₂ Atual</p>
              <h3>850 ppm</h3>
              <span>&lt; 1000 ppm</span>
            </div>
            <div className={styles.card}>
              <p>Pessoas na Sala</p>
              <h3>12</h3>
              <span>Máx: 20</span>
            </div>
            <div className={styles.card}>
              <p>Nível de Ruído</p>
              <h3>54 dB</h3>
              <span>Dentro do aceitável</span>
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
        </main>
      </div>
    </div>
  );
};

export default Home;
