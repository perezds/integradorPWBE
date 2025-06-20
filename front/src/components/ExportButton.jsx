import React from 'react';
import axios from 'axios';
import styles from './ExportButton.module.css';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ExportButton({ endpoint = '/api/exportar/', filename = 'dados.xlsx' }) {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        toast.error('Você precisa estar logado para exportar.');
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', 
      });

   
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });

    
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      
      link.setAttribute('download', filename);

      document.body.appendChild(link);
      link.click();

   
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('📥 Arquivo exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar:', error);
      toast.error('❌ Erro ao exportar o arquivo.');
    }
  };

  return (
    <button className={styles.exportButton} onClick={handleExport}>
      <FaDownload className={styles.icon} />
      Exportar XLSX
    </button>
  );
}
