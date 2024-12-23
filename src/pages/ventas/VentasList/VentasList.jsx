import React, { useEffect, useState } from 'react';
import { obtenerVentasRequest, obtenerVentaPorIdRequest } from '../../../api/ventas.api';
import VentasListTable from '../../../components/VentasListTable/VentasListTable';
import './VentasList.css';

const VentasList = () => {
    const [ventas, setVentas] = useState([]);
    const [selectedVenta, setSelectedVenta] = useState(null);

    useEffect(() => {
        const loadVentas = async () => {
            try {
                const response = await obtenerVentasRequest();
                setVentas(response.data);
            } catch (error) {
                console.error('Error cargando ventas:', error);
            }
        };

        loadVentas();
    }, []);

    const handleVerDetalles = async (id) => {
        try {
            const response = await obtenerVentaPorIdRequest(id);
            setSelectedVenta(response.data);
        } catch (error) {
            console.error('Error obteniendo detalles de la venta:', error);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Listado de Ventas</h1>
            </div>
            <VentasListTable 
                ventas={ventas} 
                onVerDetalles={handleVerDetalles} 
                selectedVenta={selectedVenta} 
                setSelectedVenta={setSelectedVenta} 
            />
        </div>
    );
};

export default VentasList;