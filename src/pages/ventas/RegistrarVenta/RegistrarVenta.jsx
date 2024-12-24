import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procesarPagoEfectivoRequest, procesarPagoMercadoPagoRequest } from '../../../api/ventas.api';
import { crearOrdenQRRequest } from '../../../api/mercadopago.api';
import { getClientesRequest } from '../../../api/clientes.api';
import { inventarioList } from '../../../api/inventario.api';
import { getEstadoVendedorRequest } from '../../../api/vendedores.api';
import RegistrarVentaForm from '../../../components/RegistrarVentaForm/RegistrarVentaForm';
import { QRCode } from 'react-qrcode-logo';  // Importa la librería QRCode correctamente
import { Modal, Button, Spinner } from 'react-bootstrap';
import io from 'socket.io-client';
import './RegistrarVenta.css';
import config from '../../../config/config'

const socket = io(config.backendUrl);

const RegistrarVenta = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [venta, setVenta] = useState({
        clienteId: '',
        vendedorId: '', // Asumimos que el vendedor está autenticado y su ID está disponible
        productos: [],
        total: 0,
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [qrData, setQrData] = useState('');  // Aquí se guarda la URL del QR
    const [showQrModal, setShowQrModal] = useState(false);  // Estado para mostrar el modal del QR
    const [loadingQr, setLoadingQr] = useState(false);  // Estado para manejar la carga del QR
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);  // Estado para mostrar el modal de confirmación
    const [showEstadoModal, setShowEstadoModal] = useState(false);  // Estado para mostrar el modal de estado del vendedor
    const [showErrorModal, setShowErrorModal] = useState(false);  // Estado para mostrar el modal de error
    const navigate = useNavigate();

    useEffect(() => {
        async function verificarEstadoVendedor() {
            const response = await getEstadoVendedorRequest();
            if (response.data.estado_vendedor_id === 2) {
                setShowEstadoModal(true);
            }
        }
        verificarEstadoVendedor();
    }, []);

    useEffect(() => {
        async function loadClientes() {
            const responseClientes = await getClientesRequest();
            setClientes(responseClientes.data);
        }

        async function loadProductos() {
            try {
                const responseProductos = await inventarioList();
                setProductos(responseProductos);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        }

        loadClientes();
        loadProductos();

        // Escuchar la señal del WebSocket
        socket.on('paymentConfirmed', async (orderDetails) => {
            console.log('Pago confirmado:', orderDetails);
            await handlePaymentConfirmation(orderDetails);
        });

        return () => {
            socket.off('paymentConfirmed');
        };
    }, []);

    const verificarEstadoVendedor = async () => {
        const response = await getEstadoVendedorRequest();
        return response.data.estado_vendedor_id !== 2;
    };

    const onProcesarPago = async () => {
        try {
            await procesarPagoEfectivoRequest(venta);
            setPaymentStatus('success');
            setShowConfirmationModal(true);  // Mostrar el modal de confirmación
        } catch (error) {
            setPaymentStatus('error');
            setShowConfirmationModal(true);  // Mostrar el modal de confirmación
        }
    };

    const onProcesarPagoMercadoPago = async () => {
        const estadoVendedorHabilitado = await verificarEstadoVendedor();
        if (!estadoVendedorHabilitado) {
            setShowErrorModal(true);  // Mostrar el modal de error
            return;
        }

        setShowQrModal(true);  // Mostrar el modal del QR inmediatamente
        setLoadingQr(true);  // Mostrar el spinner de carga

        try {
            // Datos necesarios para la API de Mercado Pago
            const userId = import.meta.env.VITE_USER_ID;
            const externalPosId = import.meta.env.VITE_EXTERNAL_POS_ID;
    
            // Preparar la data que se envía a la API
            const data = {
                external_reference: `reference_${venta.clienteId}`,
                title: 'Product order',
                description: 'Purchase description.',
                notification_url: 'https://webhook.site/axsfitt',
                total_amount: venta.total,
                items: venta.productos.map(producto => {
                    const productoInfo = productos.find(p => p.idInventario === producto.inventarioId);
                    console.log('Producto Info:', productoInfo);
                    const skuNumber = producto.inventarioId.toString(); // Asignar el valor de inventarioId a skuNumber
                    localStorage.setItem('skuNumber', skuNumber); // Guardar skuNumber en localStorage
                    return {
                        sku_number: skuNumber,
                        category: 'marketplace',
                        title: productoInfo ? productoInfo.Producto : 'Producto no encontrado',
                        description: productoInfo ? productoInfo.Producto : 'Descripción no disponible',
                        unit_price: producto.precioUnitario,
                        quantity: producto.cantidad,
                        unit_measure: 'unit',
                        total_amount: producto.subtotal
                    };
                }),
                cash_out: {
                    amount: 0
                }
            };
    
            // Crear la orden en Mercado Pago y generar el QR
            const response = await crearOrdenQRRequest(data, userId, externalPosId);
            
            // Obtener la URL del QR
            console.log('Respuesta de Mercado Pago:', response);
            setQrData(response.qr_data);  // Guarda la URL del QR
            setLoadingQr(false);  // Ocultar el spinner de carga
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error.response ? error.response.data : error.message);
            setLoadingQr(false);  // Ocultar el spinner de carga en caso de error
        }
    };

    const handleNewSale = () => {
        setVenta({
            clienteId: '',
            vendedorId: '',
            productos: [],
            total: 0,
        });
        setPaymentStatus(null);
        setQrData('');
        setShowQrModal(false);  // Ocultar el modal del QR
        setShowConfirmationModal(false);  // Ocultar el modal de confirmación
    };

    const handlePaymentConfirmation = async (orderDetails) => {
        try {
            const { external_reference, items, total_amount } = orderDetails;
            const clienteId = external_reference.split('_')[1]; // Asumiendo que la referencia externa tiene el formato "reference_clienteId"

            // Recuperar skuNumber de localStorage
            const skuNumber = localStorage.getItem('skuNumber');

            // Mapear los items del pedido a los productos en el carrito
            const productosMapeados = items.map(item => {
                const productoInfo = productos.find(p => p.Producto === item.title);
                const productoVenta = venta.productos.find(p => p.inventarioId === productoInfo.idInventario);
                console.log('Producto Venta:', productoVenta);
                return {
                    inventarioId: skuNumber, // Usar la variable global skuNumber
                    cantidad: item.quantity,
                    precioUnitario: item.unit_price,
                    subtotal: item.unit_price * item.quantity
                };
            });

            const ventaData = {
                clienteId,
                vendedorId: venta.vendedorId,
                productos: productosMapeados,
                total: total_amount
            };

            console.log('Datos enviados para procesar pago con Mercado Pago:', ventaData);

            // Cerrar el modal del QR
            setShowQrModal(false);

            await procesarPagoMercadoPagoRequest(ventaData);
            setPaymentStatus('success');
            setShowConfirmationModal(true);  // Mostrar el modal de confirmación
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error);
            setPaymentStatus('error');
            setShowConfirmationModal(true);  // Mostrar el modal de confirmación
        }
    };

    const handleCloseEstadoModal = () => {
        navigate(-1); // Navegar a la página anterior
    };

    const handleConfirmationModalClose = () => {
        setShowConfirmationModal(false);
        handleNewSale(); // Vaciar el formulario
    };

    return (
        <div className="container-page">
            <h1 className="text-3xl font-bold mb-4">Registrar Venta</h1>
            <h2 className="text-xl mb-4">Complete el formulario para registrar una nueva venta.</h2>
            <RegistrarVentaForm
                clientes={clientes}
                productos={productos}
                venta={venta}
                setVenta={setVenta}
                onProcesarPago={onProcesarPago}
                onProcesarPagoMercadoPago={onProcesarPagoMercadoPago}
                paymentStatus={paymentStatus}
                handleNewSale={handleNewSale}
            />
            <Modal show={showQrModal} onHide={() => setShowQrModal(false)} centered className="qr-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Escanee el QR para completar el pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingQr ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visualmente-oculto">Cargando...</span>
                            </Spinner>
                        </div>
                    ) : (
                        qrData && (
                            <div className="qr-code">
                                <QRCode 
                                    value={qrData} 
                                    size={256} 
                                />
                            </div>
                        )
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowQrModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose} centered>
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
                        <Button variant="primary" onClick={handleConfirmationModalClose}>
                            Entendido
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showEstadoModal} onHide={handleCloseEstadoModal} backdrop="static" keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>Estado del Vendedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>No puedes realizar operaciones en estos momentos debido a que tu estado no lo permite.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseEstadoModal}>
                        Volver
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>No puedes realizar operaciones en estos momentos debido a que tu estado no lo permite.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowErrorModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegistrarVenta;