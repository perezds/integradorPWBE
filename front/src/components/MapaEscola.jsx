import styles from './MapaEscola.module.css';
import { Thermometer, Droplet, AlertTriangle, CheckCircle } from 'lucide-react';

const sensores = [
  {
    nome: 'Sala de Química',
    temperatura: 33,
    umidade: 40,
    status: 'critico',
    ultimaLeitura: '10:21 - 28/05',
    top: '40%',
    left: '60%',
  },
  {
    nome: 'Lab. Robótica',
    temperatura: 26,
    umidade: 55,
    status: 'ok',
    ultimaLeitura: '10:19 - 28/05',
    top: '55%',
    left: '25%',
  },
  {
    nome: 'Sala 101',
    temperatura: 30,
    umidade: 70,
    status: 'alerta',
    ultimaLeitura: '10:20 - 28/05',
    top: '70%',
    left: '50%',
  },
];

export default function MapaEscola() {
  return (
    <div className={styles.mapaContainer}>
      <div className={styles.planta}>
        {sensores.map((sensor, i) => (
          <div
            key={i}
            className={`${styles.sensor} ${styles[sensor.status]}`}
            style={{ top: sensor.top, left: sensor.left }}
            title={`${sensor.nome}\n🌡️ ${sensor.temperatura}°C\n💧 ${sensor.umidade}%\nÚltima: ${sensor.ultimaLeitura}`}
          >
            <div className={styles.sensorIcon}>
              {sensor.status === 'ok' && <CheckCircle />}
              {sensor.status === 'alerta' && <Thermometer />}
              {sensor.status === 'critico' && <AlertTriangle />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
