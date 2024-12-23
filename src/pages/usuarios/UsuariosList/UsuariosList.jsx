import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuariosRequest, deactivateUsuario } from '../../../api/usuarios.api';
import { getLoggedInUserId } from '../../../api/auth';
import SearchInput, { createFilter } from 'react-search-input';
import UsuariosListTable from '../../../components/UsuariosListTable/UsuariosListTable';
import { Modal, Button } from 'react-bootstrap';
import './UsuariosList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'usuario_email']; // Campos a filtrar

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();
    const loggedInUserId = getLoggedInUserId();

    useEffect(() => {
        async function loadUsuarios() {
            const responseUsuarios = await getUsuariosRequest();
            const usuariosConRolesAgrupados = responseUsuarios.data.reduce((acc, usuario) => {
                const existingUser = acc.find(u => u.usuario_id === usuario.usuario_id);
                if (existingUser) {
                    existingUser.roles.push(usuario.rol_tipo_rol);
                } else {
                    acc.push({ ...usuario, roles: [usuario.rol_tipo_rol] });
                }
                return acc;
            }, []);

            // Ordenar usuarios, colocando al usuario logueado en primer lugar
            const sortedUsuarios = usuariosConRolesAgrupados.sort((a, b) => {
                if (a.usuario_id === loggedInUserId) return -1;
                if (b.usuario_id === loggedInUserId) return 1;
                return 0;
            });

            setUsuarios(sortedUsuarios);
        }
        loadUsuarios();
    }, [loggedInUserId]);

    const handleEdit = (usuarioId) => {
        navigate(`/usuarios/editar/${usuarioId}`);
    };

    const handleBaja = (usuarioId) => {
        if (usuarioId === loggedInUserId) {
            setModalContent('No puedes darte de baja a ti mismo');
            setModalIsOpen(true);
        } else {
            deactivateUsuario(usuarioId);
            setUsuarios(usuarios.filter(usuario => usuario.usuario_id !== usuarioId));
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Usuarios</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={() => navigate('/usuarios/alta')}>
                        Agregar Usuario
                    </button>
                    <button className="inactivos-button" onClick={() => navigate('/usuarios/inactivos')}>
                        Ver Inactivos
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los usuarios activos.</h2>

            <div className="buttons-container-small">
                <button className="agregar-button" onClick={() => navigate('/usuarios/alta')}>
                    Agregar Usuario
                </button>
                <button className="inactivos-button" onClick={() => navigate('/usuarios/inactivos')}>
                    Ver Inactivos
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

            <UsuariosListTable 
                usuarios={usuarios.filter(createFilter(searchTerm, KEYS_TO_FILTERS))} // Pasamos los usuarios filtrados
                onEdit={handleEdit} // Pasamos la función handleEdit
                onBaja={handleBaja} // Pasamos la función handleBaja
                loggedInUserId={loggedInUserId} // Pasamos el ID del usuario logueado
                setModalContent={setModalContent} // Pasamos la función setModalContent
                setModalIsOpen={setModalIsOpen} // Pasamos la función setModalIsOpen
            />

            <Modal show={modalIsOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalContent}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeModal}>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UsuariosList;