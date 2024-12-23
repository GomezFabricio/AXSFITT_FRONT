import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ProductosInactivosList = ({ productos, onReactivar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProductos = productos.filter(item =>
        item.producto_descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.producto_codigo_barras?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo_producto_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.marca_producto_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <h2 className="mt-4 mb-4 text-3xl text-black">Productos Inactivos</h2>
            {Array.isArray(filteredProductos) && filteredProductos.length > 0 ? (
                <>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input mb-4 p-2 border border-gray-300 rounded sticky top-0 bg-white z-10"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 mb-8">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Código de Barras</th>
                                    <th className="px-4 py-2 border-b">Nombre Producto</th>
                                    <th className="px-4 py-2 border-b">Tipo Producto</th>
                                    <th className="px-4 py-2 border-b">Marca Producto</th>
                                    <th className="px-4 py-2 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProductos.map((producto) => (
                                    <tr key={producto.producto_codigo_barras}>
                                        <td className="px-4 py-2 border-b">{producto.producto_codigo_barras}</td>
                                        <td className="px-4 py-2 border-b">{producto.producto_descripcion}</td>
                                        <td className="px-4 py-2 border-b">{producto.tipo_producto_nombre}</td>
                                        <td className="px-4 py-2 border-b">{producto.marca_producto_nombre}</td>
                                        <td className="px-4 py-2 border-b flex space-x-2">
                                            <button className="reactivar-button btn btn-sm" onClick={() => onReactivar(producto.producto_id)}>
                                                <i className="fas fa-check-circle icon"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p>No hay datos disponibles en los productos inactivos.</p>
            )}
        </div>
    );
};

export default ProductosInactivosList;