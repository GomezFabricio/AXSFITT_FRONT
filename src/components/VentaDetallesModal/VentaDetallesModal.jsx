import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './VentaDetallesModal.css';

const VentaDetallesModal = ({ show, onHide, venta }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTotal = (total) => {
        return typeof total === 'number' ? total.toFixed(2) : '0.00';
    };

    const formatSubtotal = (subtotal) => {
        return typeof subtotal === 'number' ? subtotal.toFixed(2) : '0.00';
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="factura">
                    <p><strong>Fecha:</strong> {formatDate(venta.venta_fecha)}</p>
                    <p><strong>Cliente:</strong> {venta.clienteNombre && venta.clienteApellido ? `${venta.clienteNombre} ${venta.clienteApellido}` : ''}</p>
                    {venta.vendedorNombre && venta.vendedorApellido && (
                        <p><strong>Vendedor:</strong> {`${venta.vendedorNombre} ${venta.vendedorApellido}`}</p>
                    )}
                    <h3>Productos</h3>
                    <ul>
                        {venta.detalles && venta.detalles.map((producto, index) => (
                            <li key={index}>
                                {producto.detalle_venta_cantidad} x {producto.productoDescripcion} - ${formatSubtotal(parseFloat(producto.detalle_venta_subtotal))}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${formatTotal(parseFloat(venta.venta_total))}</h3>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VentaDetallesModal;