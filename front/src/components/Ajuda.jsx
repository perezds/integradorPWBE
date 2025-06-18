import React, { useState } from 'react';
import styles from './Ajuda.module.css';
import Sidebar from './Sidebar';
import Header from './HeaderHome';

const faqs = [
  {
    pergunta: "Como ver as notificações?",
    resposta: "Acesse o menu lateral  'Notificações' no canto esquerdo da página"
  },
  {
    pergunta: "Como visualizar os sensores?",
    resposta: "Acesse o menu lateral 'Configurações' e clique em 'Sensores'"
  },
  {
    pergunta: "Como alterar o nome de perfil?",
    resposta: "Vá até 'Configurações' > 'Perfil', clique em 'Editar', atualize seu nome e salve as alterações no botão correspondente."
  },
  {
    pergunta: "Aonde está disponível o relatório?",
    resposta: "Os relatórios estão na seção 'Relatórios' do menu lateral. Você pode filtrar por tipo, data e exportar em PDF ou CSV."
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
