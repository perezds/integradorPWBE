import React, { useState } from 'react';
import styles from './Ajuda.module.css';
import Sidebar from './Sidebar';
import Header from './HeaderHome';

const faqs = [
  {
    pergunta: "Como visualizar os sensores no mapa?",
    resposta: "Vá até o menu 'Sensores', clique no botão 'Visualizar no mapa' e pronto! O mapa irá destacar os sensores ativos."
  },
  {
    pergunta: "O que significam as cores dos status?",
    resposta: "Verde: Normal / Amarelo: Atenção / Vermelho: Alerta crítico. Essas cores aparecem nos indicadores do sensor."
  },
  {
    pergunta: "Como exportar relatórios?",
    resposta: "Clique em 'Relatórios', selecione o tipo e o período, depois clique em 'Exportar' no canto superior direito."
  },
  {
    pergunta: "Como alterar limiares de alerta?",
    resposta: "Entre no painel de configuração de sensores, selecione o sensor e edite os valores de alerta no campo correspondente."
  }
];

const Ajuda = () => {
  const [aberta, setAberta] = useState(null);

  const toggleResposta = (index) => {
    setAberta(aberta === index ? null : index);
  };

  return (
     <div className={styles.menuContainer}>
    <Sidebar />
    <div className={styles.menuContent}>
      <Header />
    <div className={styles.ajudaContainer}>
      <h1 className={styles.titulo}>Central de Ajuda</h1>
      <p className={styles.subtitulo}>A base de conhecimento para exploradores do dashboard STRΛTA.</p>

      <section className={styles.secao}>
        <h2>Dúvidas Frequentes</h2>
        {faqs.map((item, index) => (
          <div key={index}>
            <div
              className={`${styles.pergunta} ${aberta === index ? styles.ativa : ''}`}
              onClick={() => toggleResposta(index)}
            >
              {item.pergunta}
            </div>
            <div className={styles.resposta}>
              {item.resposta}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.secaoContato}>
        <h2> Precisa de mais ajuda?</h2>
        <p>Email: suporte@strata-escola.edu</p>
        <p>Ramal: 1337</p>
        <p>Chat interno: “STRΛTA Assist”</p>
      </section>
    </div>
    </div>
    </div>
  );
};

export default Ajuda;
