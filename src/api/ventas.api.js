import axios from 'axios';
import config from '../../src/config/config'; 

// Obtener el token desde el almacenamiento local
const token = localStorage.getItem('token');
const selectedRoleId = localStorage.getItem('selectedRoleId');

// Configuración del encabezado con el token
const axiosConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
        'x-selected-role-id': selectedRoleId,
    },
};

// Obtener todas las ventas
export const obtenerVentasRequest = async () => {
    console.log('API: obtenerVentasRequest');
    return await axios.get(`${config.backendUrl}/ventas`, axiosConfig);
};

// Obtener una venta por su ID
export const obtenerVentaPorIdRequest = async (id) => {
    console.log('API: obtenerVentaPorIdRequest', id);
    return await axios.get(`${config.backendUrl}/ventas/${id}`, axiosConfig);
};

// Descargar el reporte de ventas en formato Excel
export const descargarReporteVentasRequest = async () => {
    console.log('API: descargarReporteVentasRequest');
    try {
        const response = await axios.get(`${config.backendUrl}/ventas/reporte`, {
            responseType: 'blob',
            ...axiosConfig,
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Reporte_Ventas.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error descargando el reporte de ventas:', error);
        throw error;
    }
};

// Procesar pago en efectivo
export const procesarPagoEfectivoRequest = async (data) => {
    console.log('API: procesarPagoEfectivoRequest', data);
    return await axios.post(`${config.backendUrl}/ventas/pago-efectivo`, data, axiosConfig);
};

// Procesar pago con Mercado Pago
export const procesarPagoMercadoPagoRequest = async (data) => {
    console.log('API: procesarPagoMercadoPagoRequest', data);
    return await axios.post(`${config.backendUrl}/ventas/pago-mercadopago`, data, axiosConfig);
};