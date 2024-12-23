import React, { useState } from 'react';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import './RegistrarVentaForm.css';

const RegistrarVentaForm = ({ 
    clientes, 
    productos, 
    venta, 
    setVenta, 
    onProcesarPago, 
    onProcesarPagoMercadoPago, 
    paymentStatus, 
    handleNewSale 
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleClienteChange = (selectedOption) => {
        setSelectedCliente(selectedOption);
        const cliente = clientes.find(cliente => cliente.cliente_id === selectedOption.value);
        setVenta({ ...venta, clienteId: selectedOption.value });
    };

    const handleAgregarProducto = () => {
        if (selectedProduct && cantidad > 0) {
            const producto = productos.find(p => p.idProducto === selectedProduct.value);
            const precioUnitario = venta.clienteId ? parseFloat(producto.PrecioAfiliados) : parseFloat(producto.PrecioVenta);
            const cantidadNumerica = parseInt(cantidad, 10);

            if (cantidadNumerica > producto.Cantidad) {
                alert('La cantidad seleccionada supera la cantidad en stock.');
                return;
            }

            const subtotal = precioUnitario * cantidadNumerica;

            if (isNaN(subtotal)) {
                console.error('Error: Subtotal es NaN. Verifique los valores de precio y cantidad.');
                return;
            }

            const nuevoProducto = {
                inventarioId: producto.idInventario, // Asegurarse de usar el inventario_id correcto
                cantidad: cantidadNumerica,
                precioUnitario,
                subtotal,
            };

            setVenta({
                ...venta,
                productos: [...venta.productos, nuevoProducto],
                total: venta.total + subtotal,
            });

            setModalIsOpen(false);
            setSelectedProduct(null);
            setCantidad(1);
        }
    };

    const handleEliminarProducto = (index) => {
        const productoEliminado = venta.productos[index];
        setVenta({
            ...venta,
            productos: venta.productos.filter((_, i) => i !== index),
            total: venta.total - productoEliminado.subtotal,
        });
    };

    const handleContinue = () => {
        setShowPaymentOptions(true);
    };

    const handleConfirmPayment = async (paymentMethod) => {
        setShowPaymentOptions(false);
        try {
            if (paymentMethod === 'efectivo') {
                await onProcesarPago();
            } else if (paymentMethod === 'mercadoPago') {
                await onProcesarPagoMercadoPago();
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
    };

    const handleNewSaleClick = () => {
        handleNewSale();
        setSelectedCliente(null);
        setShowConfirmationModal(false);
    };

    return (
        <div className="registrar-venta-form">
            <div className="form-group">
                <label>Cliente</label>
                <Select
                    value={selectedCliente}
                    options={clientes.map(cliente => ({ value: cliente.cliente_id, label: `${cliente.persona_nombre} ${cliente.persona_apellido}` }))}
                    onChange={handleClienteChange}
                />
            </div>

            <div className="form-group">
                <Button onClick={() => setModalIsOpen(true)} className="agregar-producto-button">
                    Agregar Productos
                </Button>
            </div>

            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        options={productos.map(producto => ({ value: producto.idProducto, label: producto.Producto }))}
                        onChange={setSelectedProduct}
                    />
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                            min="1"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAgregarProducto} className="agregar-producto-button">
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="carrito-ventas">
                <h3>Carrito de Ventas</h3>
                <ul>
                    {venta.productos.map((producto, index) => {
                        const productoInfo = productos.find(p => p.idInventario === producto.inventarioId);
                        return (
                            <li key={index}>
                                {producto.cantidad} x {productoInfo ? productoInfo.Producto : 'Producto no encontrado'} - ${producto.subtotal.toFixed(2)}
                                <Button variant="danger" onClick={() => handleEliminarProducto(index)} className="eliminar-producto-button">
                                    Eliminar
                                </Button>
                            </li>
                        );
                    })}
                </ul>
                <h4>Total: ${venta.total.toFixed(2)}</h4>
            </div>

            <div className="form-group">
                <Button onClick={handleContinue} className="continuar-button">
                    Continuar
                </Button>
            </div>

            <Modal show={showPaymentOptions} onHide={() => setShowPaymentOptions(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Opciones de Pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="payment-options">
                        <Button variant="primary" onClick={() => handleConfirmPayment('efectivo')} className="pago-button">
                            Pago en Efectivo
                        </Button>
                        <Button variant="primary" onClick={() => handleConfirmPayment('mercadoPago')} className="pago-button">
                            Pago con Mercado Pago
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{paymentStatus === 'success' ? 'Pago realizado correctamente' : 'Error en el pago'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paymentStatus === 'success' ? (
                        <p>El pago se ha realizado con éxito.</p>
                    ) : (
                        <p>Ha ocurrido un error al procesar el pago. Por favor, intenta nuevamente.</p>
                    )}
                    <div className="confirmation-buttons">
                        <Button variant="primary" onClick={handleNewSaleClick}>
                            Iniciar nueva venta
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RegistrarVentaForm;