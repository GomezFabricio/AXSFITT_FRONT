import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RolCard from '../../../components/RolCard/RolCard';
import { getRolesByUserIdRequest } from '../../../api/usuarios.api';
import { getMenuByRole } from '../../../api/login.api';
import { jwtDecode } from 'jwt-decode';
import './SeleccionRol.css';

const SeleccionRol = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;

                    try {
                        const response = await getRolesByUserIdRequest(userId);
                        setRoles(response.data);

                        if (response.data.length === 1) {
                            handleRolClick(response.data[0].rol_id);
                        }
                        setLoading(false);
                    } catch (err) {
                        console.error('Error al obtener los roles:', err);
                        setError('Error al obtener los roles. Intenta nuevamente.');
                        setLoading(false);
                    }
                    
                } catch (err) {
                    console.error('Error al decodificar el token:', err);
                    setError('Error al obtener los roles. Intenta nuevamente.');
                    setLoading(false);
                }
            } else {
                setError('No se encontró el token. Por favor, inicia sesión nuevamente.');
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleRolClick = async (rolId) => {
        try {
            const response = await getMenuByRole({ rolId });
            const menuOptions = response.data.menu;

            localStorage.setItem('menuOptions', JSON.stringify(menuOptions));
            localStorage.setItem('selectedRoleId', rolId); // Almacenar el ID del rol seleccionado

            switch (rolId) {
                case 1:
                    navigate('/vendedores');
                    break;
                case 2:
                    navigate('/registrar-venta');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } catch (error) {
            console.error('Error al obtener el menú:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container-page">
            <h1>Selecciona tu Rol</h1>
            <div className="rol-cards">
                {roles && roles.length > 0 ? (
                    roles.map((rol) => (
                        <RolCard
                            key={rol.rol_id}
                            rolNombre={rol.rol_tipo_rol}
                            onClick={() => handleRolClick(rol.rol_id)}
                        />
                    ))
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
};

export default SeleccionRol;