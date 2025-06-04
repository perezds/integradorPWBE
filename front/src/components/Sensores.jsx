import React, { useState } from 'react';
import estilos from './SettingsPage.module.css';
import Header from './HeaderHome';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Sensores() {
  const navigate = useNavigate();
  const [sensores, setSensores] = useState([]);
  const [novoSensor, setNovoSensor] = useState('');

  const adicionarSensor = () => {
    if (novoSensor.trim()) {
      setSensores([...sensores, { nome: novoSensor, status: 'ativo', temperaturaLimite: 30 }]);
      setNovoSensor('');
    }
  };

  const removerSensor = (index) => {
    const atualizado = [...sensores];
    atualizado.splice(index, 1);
    setSensores(atualizado);
  };

  const atualizarLimite = (index, novoLimite) => {
    const atualizado = sensores.map((s, i) =>
      i === index ? { ...s, temperaturaLimite: novoLimite } : s
    );
    setSensores(atualizado);
  };

  return (
    <div className={estilos.menuContainer}>
      <Sidebar />
      <div className={estilos.menuContent}>
        <Header />
        <h1>Sensores</h1>

        <div className={estilos.secao}>
          <h2>Gerenciar Sensores</h2>
          <input
            type="text"
            placeholder="Nome do sensor"
            value={novoSensor}
            onChange={(e) => setNovoSensor(e.target.value)}
            className={estilos.input}
          />
          <button onClick={adicionarSensor}>Adicionar</button>

          <ul className={estilos.lista}>
            {sensores.map((sensor, index) => (
              <li key={index} className={estilos.itemSensor}>
                <span>{sensor.nome} - {sensor.status}</span>
                <input
                  type="number"
                  value={sensor.temperaturaLimite}
                  onChange={(e) => atualizarLimite(index, Number(e.target.value))}
                  className={estilos.inputPequeno}
                />
                <span>°C</span>
                <button onClick={() => removerSensor(index)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={estilos.secao}>
          <h2>Logs do Sistema</h2>
          <ul className={estilos.lista}>
            <li>Sensor 3 desconectado - 12:43</li>
            <li>Temperatura ultrapassou 30°C - 10:15</li>
            <li>Sensor 2 conectado - 08:52</li>
          </ul>
        </div>

        <div className={estilos.secao}>
          <h2>Status da Rede e Saúde</h2>
          <p>Todos os sensores estão online.</p>
          <div className={estilos.statusRede}>
            {sensores.map((s, i) => (
              <div key={i} className={estilos.sensorStatus}>
                {s.nome}: ✅ Online
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
