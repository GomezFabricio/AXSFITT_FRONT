import axios from 'axios';
import config from '../../src/config/config'; 

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');

// Configuración del encabezado con el token
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export const getVendedoresRequest = async () => {
    return await axios.get(`${config.backendUrl}/vendedores`, axiosConfig);
};

export const getVendedorRequest = async (id) => {
    return await axios.get(`${config.backendUrl}/vendedores/${id}`, axiosConfig);
};

export const getEstadoVendedorRequest = async () => {
    return await axios.get(`${config.backendUrl}/vendedores/estado`, axiosConfig); 
};

export const createVendedorRequest = async (data) => {
    console.log('Datos enviados a la API para crear vendedor:', data); 
    await axios.post(`${config.backendUrl}/vendedores`, data, axiosConfig);
};

export const deactivateVendedor = async (id) => {
    await axios.put(`${config.backendUrl}/vendedores/${id}/baja`, null, axiosConfig);
};

export const getVendedoresInactivosRequest = async () => {
    return await axios.get(`${config.backendUrl}/vendedores/inactivos`, axiosConfig);
};

export const activateVendedorRequest = async (id) => {
    return await axios.put(`${config.backendUrl}/vendedores/${id}/activar`, null, axiosConfig);
};

export const updateVendedorRequest = async (id, data) => {
    return await axios.put(`${config.backendUrl}/vendedores/${id}`, data, axiosConfig);
};

export const liquidarComisiones = async (id) => {
    return await axios.put(`${config.backendUrl}/vendedores/${id}/liquidar`, null, axiosConfig);
};