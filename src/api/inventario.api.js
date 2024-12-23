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

// Función para listar inventario con detalles
export const inventarioList = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/inventario-list`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todas las marcas
export const marcasList = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/marcas-list`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los tipos de productos
export const tiposProductosList = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/tipos-productos-list`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para listar todos los productos
export const productosList = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/productos-list`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un tipo de producto
export const agregarTipoProducto = async (nombreTipoProducto) => {
    try {
        const response = await axios.post(`${config.backendUrl}/inventario/agregar-tipo-producto`, { nombreTipoProducto }, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar una marca
export const agregarMarca = async (nombreMarcaProducto) => {
    try {
        const response = await axios.post(`${config.backendUrl}/inventario/agregar-marca`, { nombreMarcaProducto }, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar un producto
export const agregarProducto = async (producto) => {
    try {
        const response = await axios.post(`${config.backendUrl}/inventario/agregar-producto`, producto, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para agregar inventario
export const agregarInventario = async (inventario) => {
    try {
        const response = await axios.post(`${config.backendUrl}/inventario/agregar-inventario`, inventario, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para obtener inventario por ID
export const obtenerInventarioPorId = async (id) => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/obtener-inventario/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar inventario
export const eliminarInventario = async (id) => {
    try {
        const response = await axios.delete(`${config.backendUrl}/inventario/eliminar-inventario/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar marca
export const eliminarMarca = async (id) => {
    try {
        const response = await axios.delete(`${config.backendUrl}/inventario/eliminar-marca/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar tipo de producto
export const eliminarTipoProducto = async (id) => {
    try {
        const response = await axios.delete(`${config.backendUrl}/inventario/eliminar-tipo-producto/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para eliminar producto
export const eliminarProducto = async (id) => {
    try {
        const response = await axios.delete(`${config.backendUrl}/inventario/eliminar-producto/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar inventario
export const editarInventario = async (id, inventario) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/editar-inventario/${id}`, inventario, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar producto
export const editarProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/editar-producto/${id}`, producto, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar marca
export const editarMarca = async (id, marca) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/editar-marca/${id}`, marca, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Función para editar tipo de producto
export const editarTipoProducto = async (id, tipoProducto) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/editar-tipo-producto/${id}`, tipoProducto, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para ver inactivos
export const verInventariosInactivos = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/inventarios-inactivos`, axiosConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verProductosInactivos = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/productos-inactivos`, axiosConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verMarcasInactivas = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/marcas-inactivas`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verTiposProductosInactivos = async () => {
    try {
        const response = await axios.get(`${config.backendUrl}/inventario/tipos-productos-inactivos`, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funciones para reactivar
export const reactivarInventario = async (id) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/reactivar-inventario/${id}`, {}, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarProducto = async (id) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/reactivar-producto/${id}`, {}, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarMarca = async (id) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/reactivar-marca/${id}`, {}, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const reactivarTipoProducto = async (id) => {
    try {
        const response = await axios.put(`${config.backendUrl}/inventario/reactivar-tipo-producto/${id}`, {}, axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};