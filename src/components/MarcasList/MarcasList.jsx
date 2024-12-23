import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const MarcasList = ({ marcas, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMarcas = marcas.filter(item =>
        item.nombreMarcaProducto?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            {Array.isArray(filteredMarcas) && filteredMarcas.length > 0 && (
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input mb-4 p-2 border border-gray-300 rounded sticky top-0 bg-white z-10"
                />
            )}
            <div className="overflow-x-auto">
                {Array.isArray(filteredMarcas) && filteredMarcas.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Marca Producto</th>
                                <th className="px-4 py-2 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMarcas.map((marca) => (
                                <tr key={marca.idMarcaProducto}>
                                    <td className="px-4 py-2 border-b">{marca.nombreMarcaProducto}</td>
                                    <td className="px-4 py-2 border-b flex space-x-2">
                                        <button className="edit-button btn btn-sm" onClick={() => onEdit(marca)}>
                                            <i className="fas fa-edit icon"></i>
                                        </button>
                                        <button className="delete-button btn btn-sm" onClick={() => onDelete(marca.idMarcaProducto)}>
                                            <i className="fas fa-trash-alt icon"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles en las marcas.</p>
                )}
            </div>
        </div>
    );
};

export default MarcasList;