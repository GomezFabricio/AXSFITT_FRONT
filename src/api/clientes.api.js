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

// Obtener todos los clientes activos
export const getClientesRequest = async () => {
    console.log('Enviando solicitud GET a /clientes');
    const response = await axios.get(`${config.backendUrl}/clientes`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Obtener todos los clientes inactivos
export const getClientesInactivosRequest = async () => {
    console.log('Enviando solicitud GET a /clientes/inactivos');
    const response = await axios.get(`${config.backendUrl}/clientes/inactivos`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Obtener un cliente por su ID
export const getClienteRequest = async (id) => {
    console.log(`Enviando solicitud GET a /clientes/${id}`);
    const response = await axios.get(`${config.backendUrl}/clientes/${id}`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Crear un cliente
export const createClienteRequest = async (data) => {
    console.log('Enviando solicitud POST a /clientes con datos:', data);
    const response = await axios.post(`${config.backendUrl}/clientes`, data, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Modificar un cliente (actualizar información)
export const updateClienteRequest = async (id, data) => {
    console.log(`Enviando solicitud PUT a /clientes/${id} con datos:`, data);
    const response = await axios.put(`${config.backendUrl}/clientes/${id}`, data, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Dar de baja un cliente (cambiar a inactivo)
export const deactivateClienteRequest = async (id) => {
    console.log(`Enviando solicitud PUT a /clientes/${id}/baja`);
    const response = await axios.put(`${config.backendUrl}/clientes/${id}/baja`, null, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Reactivar un cliente (cambiar a activo)
export const activateClienteRequest = async (id) => {
    console.log(`Enviando solicitud PUT a /clientes/${id}/activar`);
    const response = await axios.put(`${config.backendUrl}/clientes/${id}/activar`, null, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Desactivar automáticamente clientes sin compras en los últimos 45 días
export const deactivateClientesAutomaticallyRequest = async () => {
    console.log('Enviando solicitud PUT a /clientes/desactivar-automaticamente');
    const response = await axios.put(`${config.backendUrl}/clientes/desactivar-automaticamente`, null, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Validar si el correo ya está registrado como cliente
export const checkEmailExistsAsClienteRequest = async (email) => {
    console.log(`Enviando solicitud GET a /clientes/check-email/${email}`);
    const response = await axios.get(`${config.backendUrl}/clientes/check-email/${email}`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};