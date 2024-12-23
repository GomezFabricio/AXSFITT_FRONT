import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientesInactivosRequest, activateClienteRequest } from '../../../api/clientes.api';
import SearchInput, { createFilter } from 'react-search-input';
import ClientesInactivosTable from '../../../components/ClientesInactivosTable/ClientesInactivosTable';
    
const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni', 'persona_telefono']; // Campos a filtrar

const ClientesInactivosList = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function loadClientesInactivos() {
            const responseClientes = await getClientesInactivosRequest();
            setClientes(responseClientes.data);
        }
        loadClientesInactivos();
    }, []);

    const handleReactivarClick = async (id) => {
        try {
            await activateClienteRequest(id);
            setClientes((prevClientes) => prevClientes.filter(cliente => cliente.cliente_id !== id));
        } catch (error) {
            console.error("Error al reactivar el cliente:", error);
        }
    };

    const filteredClientes = clientes.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los clientes

    return (
        <div className="container-page">
            <div className="header">
                <h1>Clientes Inactivos</h1>
                <div className="buttons-container">
                    <button
                        onClick={() => navigate(-1)}
                        className="volver-button"
                    >
                        Volver
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los clientes inactivos.</h2>

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
                    placeholder="Buscar cliente..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            {filteredClientes.length > 0 ? (
                <ClientesInactivosTable 
                    clientes={filteredClientes} // Pasamos los clientes filtrados
                    onReactivarClick={handleReactivarClick}
                />
            ) : (
                <p style={{ textAlign: 'center' }}>No hay datos para mostrar.</p>
            )}
        </div>
    );
}

export default ClientesInactivosList;