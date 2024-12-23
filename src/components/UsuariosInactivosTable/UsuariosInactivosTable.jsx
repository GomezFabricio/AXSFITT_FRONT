import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const UsuariosInactivosTable = ({ usuarios, onReactivarClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Nombre</th>
                        <th className="px-4 py-2 border-b">Apellido</th>
                        <th className="px-4 py-2 border-b">DNI</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Rol</th>
                        <th className="px-4 py-2 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.usuario_id}>
                            <td className="px-4 py-2 border-b">{usuario.persona_nombre}</td>
                            <td className="px-4 py-2 border-b">{usuario.persona_apellido}</td>
                            <td className="px-4 py-2 border-b">{usuario.persona_dni}</td>
                            <td className="px-4 py-2 border-b">{usuario.usuario_email}</td>
                            <td className="px-4 py-2 border-b">{usuario.roles.join(', ')}</td>
                            <td className="px-4 py-2 border-b flex space-x-2">
                                <button onClick={() => onReactivarClick(usuario.usuario_id)} className="reingreso-button btn btn-sm">
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

export default UsuariosInactivosTable;