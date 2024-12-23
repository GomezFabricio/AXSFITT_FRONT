import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuariosInactivosRequest, activateUsuarioRequest } from '../../../api/usuarios.api';
import SearchInput, { createFilter } from 'react-search-input';
import UsuariosInactivosTable from '../../../components/UsuariosInactivosTable/UsuariosInactivosTable';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'usuario_email']; // Campos a filtrar

const UsuariosInactivosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUsuariosInactivos() {
            const responseUsuarios = await getUsuariosInactivosRequest();
            const usuariosConRolesAgrupados = responseUsuarios.data.reduce((acc, usuario) => {
                const existingUser = acc.find(u => u.usuario_id === usuario.usuario_id);
                if (existingUser) {
                    existingUser.roles.push(usuario.rol_tipo_rol);
                } else {
                    acc.push({ ...usuario, roles: [usuario.rol_tipo_rol] });
                }
                return acc;
            }, []);
            setUsuarios(usuariosConRolesAgrupados);
        }
        loadUsuariosInactivos();
    }, []);

    const handleReactivarClick = async (id) => {
        try {
            await activateUsuarioRequest(id);
            setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.usuario_id !== id));
        } catch (error) {
            console.error("Error al reactivar el usuario:", error);
        }
    };

    const filteredUsuarios = usuarios.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los usuarios

    return (
        <div className="container-page">
            <div className="header">
                <h1>Usuarios Inactivos</h1>
                <div className="buttons-container">
                    <button
                        onClick={() => navigate(-1)}
                        className="volver-button"
                    >
                        Volver
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los usuarios inactivos.</h2>

            <div className="buttons-container-small">
                <button
                    onClick={() => navigate(-1)}
                    className="volver-button"
                >
                    Volver
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchInput
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '12px',
                        marginBottom: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '25px',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                    }}
                    placeholder="Buscar usuario..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            {filteredUsuarios.length > 0 ? (
                <UsuariosInactivosTable 
                    usuarios={filteredUsuarios} // Pasamos los usuarios filtrados
                    onReactivarClick={handleReactivarClick}
                />
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay datos para mostrar.</p>
            )}
        </div>
    );
}

export default UsuariosInactivosList;