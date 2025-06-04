import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // URL base da API
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Pega o token JWT do localStorage
    },
});

export const fetchAmbientes = async () => {
    try {
        const response = await api.get('ambientes/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ambientes:', error);
    }
};

export const fetchSensores = async () => {
    try {
        const response = await api.get('sensores/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar sensores:', error);
    }
};
