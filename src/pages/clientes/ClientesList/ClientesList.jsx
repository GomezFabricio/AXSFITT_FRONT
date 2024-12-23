import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientesRequest, deactivateClienteRequest } from '../../../api/clientes.api';
import SearchInput, { createFilter } from 'react-search-input';
import ClientesListTable from '../../../components/ClientesListTable/ClientesListTable';
import './ClientesList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'persona_telefono']; // Campos a filtrar

const ClientesList = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientes() {
            const responseClientes = await getClientesRequest();
            setClientes(responseClientes.data);
        }
        loadClientes();
    }, []);

    const filteredClientes = clientes.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los clientes

    const handleAltaClick = () => {
        // Navegar a la página de alta de cliente
        navigate('/clientes/alta');
    };

    const handleBajaClick = async (id) => {
        // Manejar la baja del cliente con el id proporcionado
        try {
            await deactivateClienteRequest(id);
            // Actualizar el estado de clientes para eliminar el cliente de la lista
            setClientes((prevClientes) => prevClientes.filter(cliente => cliente.cliente_id !== id));
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
        }
    };

    const handleInactivosClick = () => {
        navigate('/clientes/inactivos');
    };

    const handleEditClick = (id) => {
        // Navegar a la página de edición de cliente
        navigate(`/clientes/editar/${id}`);
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Clientes</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAltaClick}>
                        Agregar Cliente
                    </button>
                    <button className="inactivos-button" onClick={handleInactivosClick}>
                        Ver Inactivos
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los clientes activos.</h2>

            <div className="buttons-container-small">
                <button className="agregar-button" onClick={handleAltaClick}>
                    Agregar Cliente
                </button>
                <button className="inactivos-button" onClick={handleInactivosClick}>
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
                    placeholder="Buscar cliente..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            <ClientesListTable 
                clientes={filteredClientes} // Pasamos los clientes filtrados
                onEdit={handleEditClick} // Pasamos la función handleEditClick
                onBaja={handleBajaClick} // Pasamos la función handleBajaClick
            />
        </div>
    );
}

export default ClientesList;