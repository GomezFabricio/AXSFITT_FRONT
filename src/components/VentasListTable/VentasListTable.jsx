import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../assets/styles/IconStyles.css';
import VentaDetallesModal from '../VentaDetallesModal/VentaDetallesModal';

const VentasListTable = ({ ventas, onVerDetalles, selectedVenta, setSelectedVenta }) => {
    const [modalShow, setModalShow] = useState(false);

    const handleVerDetallesClick = async (venta) => {
        await onVerDetalles(venta.ventas_id); 
        setModalShow(true);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Fecha</th>
                            <th className="px-4 py-2 border-b">Cliente</th>
                            <th className="px-4 py-2 border-b">Vendedor</th>
                            <th className="px-4 py-2 border-b">Total</th>
                            <th className="px-4 py-2 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.ventas_id}>
                                <td className="px-4 py-2 border-b">{formatDate(venta.venta_fecha)}</td>
                                <td className="px-4 py-2 border-b">{venta.clienteNombre && venta.clienteApellido ? `${venta.clienteNombre} ${venta.clienteApellido}` : ''}</td>
                                <td className="px-4 py-2 border-b">{venta.vendedorNombre && venta.vendedorApellido ? `${venta.vendedorNombre} ${venta.vendedorApellido}` : ''}</td>
                                <td className="px-4 py-2 border-b">{venta.venta_total}</td>
                                <td className="px-4 py-2 border-b flex space-x-2">
                                    <button onClick={() => handleVerDetallesClick(venta)} className="details-button btn btn-sm">
                                        <i className="fas fa-eye icon"></i> Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedVenta && (
                <VentaDetallesModal
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setSelectedVenta(null);
                    }}
                    venta={selectedVenta}
                />
            )}
        </>
    );
}

export default VentasListTable;