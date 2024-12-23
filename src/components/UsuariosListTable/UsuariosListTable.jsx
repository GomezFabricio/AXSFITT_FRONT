import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';

const UsuariosListTable = ({ usuarios, onEdit, onBaja, loggedInUserId, setModalContent, setModalIsOpen }) => {
    const handleEdit = (usuarioId) => {
        if (usuarioId === loggedInUserId) {
            setModalContent('No puede editarse a sí mismo. Para realizar modificaciones, diríjase a "Mi Perfil".');
            setModalIsOpen(true);
        } else {
            onEdit(usuarioId);
        }
    };

    const handleBaja = (usuarioId) => {
        if (usuarioId === loggedInUserId) {
            setModalContent('No puedes darte de baja a ti mismo');
            setModalIsOpen(true);
        } else {
            onBaja(usuarioId);
        }
    };

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
                            <td className="px-4 py-2 border-b">{usuario.persona_nombre} {usuario.usuario_id === loggedInUserId && '(Tú)'}</td>
                            <td className="px-4 py-2 border-b">{usuario.persona_apellido}</td>
                            <td className="px-4 py-2 border-b">{usuario.persona_dni}</td>
                            <td className="px-4 py-2 border-b">{usuario.usuario_email}</td>
                            <td className="px-4 py-2 border-b">{usuario.roles.join(', ')}</td>
                            <td className="px-4 py-2 border-b flex space-x-2">
                                <button onClick={() => handleEdit(usuario.usuario_id)} className="edit-button btn btn-sm">
                                    <i className="fas fa-edit icon"></i>
                                </button>
                                <button onClick={() => handleBaja(usuario.usuario_id)} className="delete-button btn btn-sm">
                                    <i className="fas fa-trash-alt icon"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuariosListTable;