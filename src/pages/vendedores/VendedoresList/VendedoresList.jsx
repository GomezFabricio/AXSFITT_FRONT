import React, { useEffect, useState } from 'react';
import { getVendedoresRequest } from '../../../api/vendedores.api';
import VendedorCard from '../../../components/VendedorCard/VendedorCard';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import './VendedoresList.css';

const KEYS_TO_FILTERS = ['persona_nombre', 'persona_apellido', 'persona_dni']; // Campos a filtrar

const VendedoresList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadVendedores() {
      const responseVendedores = await getVendedoresRequest();
      setVendedores(responseVendedores.data);
    }
    loadVendedores();
  }, []);

  const filteredVendedores = vendedores.filter(createFilter(searchTerm, KEYS_TO_FILTERS)); // Filtramos los vendedores

  const navigate = useNavigate();

  const handleDetalleClick = (vendedorId) => {
    navigate(`/vendedor/${vendedorId}`); // Navegamos a la página de detalle del vendedor
  };

  const handleInactivosClick = () => {
    navigate('/vendedores/inactivos'); // Navegamos a la página de vendedores inactivos
  };

  const handleAgregarClick = () => {
    navigate('/create-vendedor'); // Navegamos a la página de agregar un nuevo vendedor
  };

  return (
    <div className="container-page">
      <div className="header">
        <h1>Vendedores</h1>
        <div className="buttons-container">
          <button className="agregar-button" onClick={handleAgregarClick}>
            Agregar Vendedor
          </button>
          <button className="inactivos-button" onClick={handleInactivosClick}>
            Ver Inactivos
          </button>
        </div>
      </div>
      <h2>En esta sección podrás ver y gestionar los vendedores activos.</h2>

      <div className="buttons-container-small">
        <button className="agregar-button" onClick={handleAgregarClick}>
          Agregar Vendedor
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
          onChange={setSearchTerm}
          placeholder="Buscar vendedores..."
        />
      </div>

      <div className="vendedores-list">
        {filteredVendedores.map((vendedor) => (
          <VendedorCard
            key={vendedor.vendedor_id}
            nombre={vendedor.persona_nombre}
            apellido={vendedor.persona_apellido}
            dni={vendedor.persona_dni}
            ventasRealizadas={vendedor.ventas_realizadas}
            comisionesPendientes={vendedor.comisiones_pendientes}
            onDetalleClick={() => handleDetalleClick(vendedor.vendedor_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VendedoresList;