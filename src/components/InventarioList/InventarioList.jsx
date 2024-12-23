import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const InventarioList = ({ inventario, onDelete, onEdit, onReingreso }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInventario = inventario.filter(item =>
        item.Producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.CodigoBarras.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inventario-list-container relative">
            {Array.isArray(filteredInventario) && filteredInventario.length > 0 && (
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input mb-4 p-2 border border-gray-300 rounded sticky top-0 bg-white z-10"
                />
            )}
            <div className="overflow-x-auto">
                {Array.isArray(filteredInventario) && filteredInventario.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Código de Barras</th>
                                <th className="px-4 py-2 border-b">Producto</th>
                                <th className="px-4 py-2 border-b">Tipo</th>
                                <th className="px-4 py-2 border-b">Marca</th>
                                <th className="px-4 py-2 border-b">Cantidad</th>
                                <th className="px-4 py-2 border-b">Precio Costo</th>
                                <th className="px-4 py-2 border-b">Precio Venta</th>
                                <th className="px-4 py-2 border-b">Precio Afiliados</th>
                                <th className="px-4 py-2 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventario.map((item) => (
                                <tr key={item.CodigoBarras}>
                                    <td className="px-4 py-2 border-b">{item.CodigoBarras}</td>
                                    <td className="px-4 py-2 border-b">{item.Producto}</td>
                                    <td className="px-4 py-2 border-b">{item.Tipo}</td>
                                    <td className="px-4 py-2 border-b">{item.Marca}</td>
                                    <td className="px-4 py-2 border-b">{item.Cantidad}</td>
                                    <td className="px-4 py-2 border-b">{item.PrecioCosto}</td>
                                    <td className="px-4 py-2 border-b">{item.PrecioVenta}</td>
                                    <td className="px-4 py-2 border-b">{item.PrecioAfiliados}</td>
                                    <td className="px-4 py-2 border-b flex space-x-2">
                                        <button className="edit-button btn btn-sm" onClick={() => onEdit(item.idProducto)}>
                                            <i className="fas fa-edit icon"></i>
                                        </button>
                                        <button className="delete-button btn btn-sm" onClick={() => onDelete(item.idProducto)}>
                                            <i className="fas fa-trash-alt icon"></i>
                                        </button>
                                        <button className="reingreso-button btn btn-sm" onClick={() => onReingreso(item.idProducto)}>
                                            <i className="fas fa-plus-circle icon"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles en el inventario.</p>
                )}
            </div>
        </div>
    );
};

export default InventarioList;