import axios from 'axios';
import config from '../../src/config/config'; 

export const loginRequest = async (data) => {
    return await axios.post(`${config.backendUrl}/login`, data);
};

// Función para obtener el menú basado en el rol del usuario
export const getMenuByRole = async ({ rolId }) => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    if (!token) {
        throw new Error('No hay token disponible');
    }

    return await axios.post(`${config.backendUrl}/menu`, { rolId }, {
        headers: {
            Authorization: `Bearer ${token}` // Pasar el token en los headers
        }
    });
};