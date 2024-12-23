import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const TiposProductosInactivosList = ({ tiposProductos, onReactivar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTiposProductos = tiposProductos.filter(item =>
        item.tipo_producto_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <h2 className="mt-4 mb-4 text-3xl text-black">Tipos de Productos Inactivos</h2>
            {Array.isArray(filteredTiposProductos) && filteredTiposProductos.length > 0 ? (
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
                                    <th className="px-4 py-2 border-b">Nombre Tipo Producto</th>
                                    <th className="px-4 py-2 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTiposProductos.map((tipoProducto) => (
                                    <tr key={tipoProducto.tipo_producto_id}>
                                        <td className="px-4 py-2 border-b">{tipoProducto.tipo_producto_nombre}</td>
                                        <td className="px-4 py-2 border-b flex space-x-2">
                                            <button className="reactivar-button btn btn-sm" onClick={() => onReactivar(tipoProducto.tipo_producto_id)}>
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
                <p>No hay datos disponibles en los tipos de productos inactivos.</p>
            )}
        </div>
    );
};

export default TiposProductosInactivosList;