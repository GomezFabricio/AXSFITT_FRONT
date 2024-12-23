import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const MarcasInactivasList = ({ marcas, onReactivar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMarcas = marcas.filter(item =>
        item.marca_producto_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <h2 className="mt-4 mb-4 text-3xl text-black">Marcas Inactivas</h2>
            {Array.isArray(filteredMarcas) && filteredMarcas.length > 0 ? (
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
                                    <th className="px-4 py-2 border-b">Marca Producto</th>
                                    <th className="px-4 py-2 border-b">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMarcas.map((marca) => (
                                    <tr key={marca.marca_producto_id}>
                                        <td className="px-4 py-2 border-b">{marca.marca_producto_nombre}</td>
                                        <td className="px-4 py-2 border-b flex space-x-2">
                                            <button className="reactivar-button btn btn-sm" onClick={() => onReactivar(marca.marca_producto_id)}>
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
                <p>No hay datos disponibles en las marcas inactivas.</p>
            )}
        </div>
    );
};

export default MarcasInactivasList;