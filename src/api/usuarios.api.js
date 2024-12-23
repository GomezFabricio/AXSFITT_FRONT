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

export const getUsuariosRequest = async () => {
    console.log('Enviando solicitud GET a /usuarios');
    const response = await axios.get(`${config.backendUrl}/usuarios`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getUsuarioRequest = async (id) => {
    console.log(`Enviando solicitud GET a /usuarios/${id}`);
    const response = await axios.get(`${config.backendUrl}/usuarios/${id}`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const createUsuarioRequest = async (data) => {
    console.log('Enviando solicitud POST a /usuarios con datos:', data);
    const response = await axios.post(`${config.backendUrl}/usuarios`, data, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const deactivateUsuario = async (id) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id}/baja`);
    const response = await axios.put(`${config.backendUrl}/usuarios/${id}/baja`, null, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getUsuariosInactivosRequest = async () => {
    console.log('Enviando solicitud GET a /usuarios/inactivos');
    const response = await axios.get(`${config.backendUrl}/usuarios/inactivos`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const activateUsuarioRequest = async (id) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id}/activar`);
    const response = await axios.put(`${config.backendUrl}/usuarios/${id}/activar`, null, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const updateUsuarioRequest = async (id, data) => {
    console.log(`Enviando solicitud PUT a /usuarios/${id} con datos:`, data);
    const response = await axios.put(`${config.backendUrl}/usuarios/${id}`, data, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getRolesRequest = async () => {
    console.log('Enviando solicitud GET a /roles');
    const response = await axios.get(`${config.backendUrl}/roles`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

// Nueva función para obtener los roles de un usuario por ID
export const getRolesByUserIdRequest = async (userId) => {
    console.log(`Enviando solicitud GET a /roles/${userId}`);
    const response = await axios.get(`${config.backendUrl}/roles/${userId}`, axiosConfig);
    console.log('Respuesta recibida:', response.data);
    return response;
};

export const getUserProfile = async () => {
    return await axios.get(`${config.backendUrl}/usuarios/perfil`, axiosConfig);
};

export const updateUserProfile = async (data) => {
    return await axios.put(`${config.backendUrl}/usuarios/perfil`, data, axiosConfig);
};

export const updateUserPassword = async (currentPassword, newPassword) => {
    return await axios.put(`${config.backendUrl}/usuarios/perfil/password`, { currentPassword, newPassword }, axiosConfig);
};

// Nueva función para verificar si un correo electrónico ya existe
export const checkEmailExistsRequest = async (email) => {
    console.log(`Enviando solicitud GET a /usuarios/check-email/${email}`); // Agregar log
    try {
        const response = await axios.get(`${config.backendUrl}/usuarios/check-email/${email}`, axiosConfig);
        console.log('Respuesta recibida:', response.data); // Agregar log
        return response;
    } catch (error) {
        console.error('Error en checkEmailExistsRequest:', error.response.data); // Agregar log
        throw error.response.data; // Lanzar el error con los datos de la respuesta
    }
};