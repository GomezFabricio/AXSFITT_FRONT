import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const ClientesInactivosTable = ({ clientes, onReactivarClick }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Nombre</th>
                        <th className="px-4 py-2 border-b">Apellido</th>
                        <th className="px-4 py-2 border-b">DNI</th>
                        <th className="px-4 py-2 border-b">Teléfono</th>
                        <th className="px-4 py-2 border-b">Fecha de Nacimiento</th>
                        <th className="px-4 py-2 border-b">Domicilio</th>
                        <th className="px-4 py-2 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.cliente_id}>
                            <td className="px-4 py-2 border-b">{cliente.persona_nombre}</td>
                            <td className="px-4 py-2 border-b">{cliente.persona_apellido}</td>
                            <td className="px-4 py-2 border-b">{cliente.persona_dni}</td>
                            <td className="px-4 py-2 border-b">{cliente.persona_telefono}</td>
                            <td className="px-4 py-2 border-b">{formatDate(cliente.persona_fecha_nacimiento)}</td>
                            <td className="px-4 py-2 border-b">{cliente.persona_domicilio}</td>
                            <td className="px-4 py-2 border-b flex space-x-2">
                                <button onClick={() => onReactivarClick(cliente.cliente_id)} className="reingreso-button btn btn-sm">
                                    <i className="fas fa-check"></i> Reactivar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientesInactivosTable;