import styles from './MensagensPage.module.css';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import {
  FaThermometerHalf,
  FaTint,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

export default function MensagensPage() {
  const mensagens = [
    {
      sensor: 'Sensor 3',
      texto: 'Temperatura subiu 8°C',
      tempo: 'agora',
      icone: <FaThermometerHalf />,
      nivel: 'alto',
    },
    {
      sensor: 'Sensor 1',
      texto: 'Umidade aumentou para 92%',
      tempo: 'há 2 min',
      icone: <FaTint />,
      nivel: 'medio',
    },
    {
      sensor: 'Sensor 5',
      texto: 'Temperatura fora da faixa segura',
      tempo: 'há 5 min',
      icone: <FaExclamationTriangle />,
      nivel: 'alto',
    },
    {
      sensor: 'Sensor 2',
      texto: 'Operando normalmente',
      tempo: 'há 10 min',
      icone: <FaCheckCircle />,
      nivel: 'baixo',
    },
  ];

  return (
    <div className={styles.menuContainer}>
    <Sidebar />
    <div className={styles.menuContent}>
      <Header />
        <div className={styles.container}>
          <h2>Notificações</h2>

          <div className={styles.avisoBox}>
            <strong>Aviso geral:</strong> A equipe de manutenção estará em treinamento na próxima terça-feira.
            Chamados urgentes devem ser sinalizados como prioridade máxima.
          </div>

          <div className={styles.grid}>
            {mensagens.map((notificacao, index) => (
              <div
                key={index}
                className={`${styles.card} ${
                  notificacao.nivel === 'alto'
                    ? styles.alto
                    : notificacao.nivel === 'medio'
                    ? styles.medio
                    : styles.baixo
                }`}
              >
                <div className={styles.icon}>{notificacao.icone}</div>

                <div className={styles.textoBox}>
                  <span className={styles.sensor}>{notificacao.sensor}</span>
                  <span className={styles.texto}>{notificacao.texto}</span>
                  <span className={styles.tempo}>{notificacao.tempo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
