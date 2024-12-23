import React from 'react';
import { useNavigate } from 'react-router-dom';
import { descargarReporteVentasRequest } from '../../../api/ventas.api';

const VentasHome = () => {
    const navigate = useNavigate();

    const handleRegistrarVentaClick = () => {
        navigate('/ventas/registrar');
    };

    const handleVerVentasClick = () => {
        navigate('/ventas/listado');
    };

    const handleReportesClick = async () => {
        try {
            await descargarReporteVentasRequest();
        } catch (error) {
            console.error('Error descargando el reporte de ventas:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <h1 className="text-5xl font-light mb-4" style={{ color: 'var(--color-principal)' }}>Ventas</h1>
                <h2 className="text-xl mb-6" style={{ color: 'var(--color-letras-fondo-claro)' }}>En esta sección podrás gestionar todas las operaciones relacionadas con las ventas.</h2>
            </div>

            <div className="flex flex-col items-center gap-4 p-5 w-full md:w-1/3 mx-auto">
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md transition duration-300 w-full"
                    style={{ backgroundColor: 'var(--color-principal-dark)', hover: 'var(--color-principal-hover)' }}
                    onClick={handleRegistrarVentaClick}
                >
                    Registrar Venta
                </button>
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md transition duration-300 w-full"
                    style={{ backgroundColor: 'var(--color-principal-dark)', hover: 'var(--color-principal-hover)' }}
                    onClick={handleVerVentasClick}
                >
                    Ver Ventas Realizadas
                </button>
                <button
                    className="text-white px-6 py-3 rounded-md shadow-md transition duration-300 w-full"
                    style={{ backgroundColor: 'var(--color-principal-dark)', hover: 'var(--color-principal-hover)' }}
                    onClick={handleReportesClick}
                >
                    Reportes de Ventas
                </button>
            </div>
        </div>
    );
};

export default VentasHome;