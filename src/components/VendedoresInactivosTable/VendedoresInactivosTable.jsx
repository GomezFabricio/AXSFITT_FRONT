import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const VendedoresInactivosTable = ({ vendedores, onActivate }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Nombre</th>
                        <th className="px-4 py-2 border-b">Apellido</th>
                        <th className="px-4 py-2 border-b">DNI</th>
                        <th className="px-4 py-2 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map((vendedor) => (
                        <tr key={vendedor.vendedor_id}>
                            <td className="px-4 py-2 border-b">{vendedor.persona_nombre}</td>
                            <td className="px-4 py-2 border-b">{vendedor.persona_apellido}</td>
                            <td className="px-4 py-2 border-b">{vendedor.persona_dni}</td>
                            <td className="px-4 py-2 border-b flex space-x-2">
                                <button onClick={() => onActivate(vendedor.vendedor_id)} className="btn btn-primary btn-sm">
                                    <i className="fas fa-check icon"></i> Alta
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendedoresInactivosTable;