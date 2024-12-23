import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const TiposProductosList = ({ tiposProductos, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTiposProductos = tiposProductos.filter(item =>
        item.nombreTipoProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            {Array.isArray(filteredTiposProductos) && filteredTiposProductos.length > 0 && (
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input mb-4 p-2 border border-gray-300 rounded sticky top-0 bg-white z-10"
                />
            )}
            <div className="overflow-x-auto">
                {Array.isArray(filteredTiposProductos) && filteredTiposProductos.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Nombre Tipo Producto</th>
                                <th className="px-4 py-2 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTiposProductos.map((tipoProducto) => (
                                <tr key={tipoProducto.idTipoProducto}>
                                    <td className="px-4 py-2 border-b">{tipoProducto.nombreTipoProducto}</td>
                                    <td className="px-4 py-2 border-b flex space-x-2">
                                        <button className="edit-button btn btn-sm" onClick={() => onEdit(tipoProducto)}>
                                            <i className="fas fa-edit icon"></i>
                                        </button>
                                        <button className="delete-button btn btn-sm" onClick={() => onDelete(tipoProducto.idTipoProducto)}>
                                            <i className="fas fa-trash icon"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles en los tipos de productos.</p>
                )}
            </div>
        </div>
    );
};

export default TiposProductosList;