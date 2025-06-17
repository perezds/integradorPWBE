import React from 'react';
import axios from 'axios';
import styles from './ExportButton.module.css';
import { FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ExportButton() {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get('/api/exportar/', {
       headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sensores.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('📥 CSV exportado com sucesso!');
    } catch (error) {
      toast.error('❌ Erro ao exportar o CSV.');
      console.error(error);
    }
  };

  return (
    <button className={styles.exportButton} onClick={handleExport}>
      <FaDownload className={styles.icon} />
      Exportar CSV
    </button>
  );
}