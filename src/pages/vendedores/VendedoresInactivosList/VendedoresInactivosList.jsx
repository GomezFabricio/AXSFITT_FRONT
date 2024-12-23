import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVendedoresInactivosRequest, activateVendedorRequest } from '../../../api/vendedores.api';
import SearchInput, { createFilter } from 'react-search-input';
import VendedoresInactivosTable from '../../../components/VendedoresInactivosTable/VendedoresInactivosTable';
import './VendedoresInactivosList.css';

const KEYS_TO_FILTERS = ['nombre', 'apellido', 'dni', 'email']; // Campos a filtrar

const VendedoresInactivosList = () => {
    const [vendedoresInactivos, setVendedoresInactivos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const loadVendedoresInactivos = async () => {
        try {
            const response = await getVendedoresInactivosRequest();
            setVendedoresInactivos(response.data);
        } catch (error) {
            console.error('Error al cargar los vendedores inactivos:', error);
        }
    };

    useEffect(() => {
        loadVendedoresInactivos(); // Cargar los vendedores inactivos cuando el componente se monta
    }, []);

    const handleActivate = async (vendedorId) => {
        try {
            await activateVendedorRequest(vendedorId);
            // Volver a cargar la lista de vendedores inactivos tras la activación
            loadVendedoresInactivos();
        } catch (error) {
            console.error('Error al activar el vendedor:', error);
        }
    };

    const filteredVendedores = vendedoresInactivos.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los vendedores

    return (
        <div className="container-page">
            <div className="header">
                <h1>Vendedores Inactivos</h1>
                <div className="buttons-container">
                    <button
                        onClick={() => navigate(-1)}
                        className="volver-button"
                    >
                        Volver
                    </button>
                </div>
            </div>

            <h2>En esta sección podrás ver y gestionar los vendedores inactivos.</h2>

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
                    placeholder="Buscar vendedor..."
                    onChange={(term) => setSearchTerm(term)}
                />
            </div>

            {filteredVendedores.length > 0 ? (
                <VendedoresInactivosTable vendedores={filteredVendedores} onActivate={handleActivate} />
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay datos para mostrar.</p>
            )}
        </div>
    );
};

export default VendedoresInactivosList;