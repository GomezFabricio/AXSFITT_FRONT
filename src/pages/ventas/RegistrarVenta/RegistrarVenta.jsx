import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { procesarPagoEfectivoRequest, procesarPagoMercadoPagoRequest } from '../../../api/ventas.api';
import { crearOrdenQRRequest } from '../../../api/mercadopago.api';
import { getClientesRequest } from '../../../api/clientes.api';
import { inventarioList } from '../../../api/inventario.api';
import RegistrarVentaForm from '../../../components/RegistrarVentaForm/RegistrarVentaForm';
import { QRCode } from 'react-qrcode-logo';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './RegistrarVenta.css';
import config from '../../../config/config';

const RegistrarVenta = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [venta, setVenta] = useState({ clienteId: '', vendedorId: '', productos: [], total: 0 });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [qrData, setQrData] = useState('');
    const [showQrModal, setShowQrModal] = useState(false);
    const [loadingQr, setLoadingQr] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();
    let pollingInterval = null;

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
    }, []);

    useEffect(() => {
        if (showQrModal) {
            startPolling();
        } else {
            stopPolling();
        }
        return () => stopPolling();
    }, [showQrModal]);

    const startPolling = () => {
        stopPolling();
        pollingInterval = setInterval(async () => {
            try {
                const response = await fetch(`${config.backendUrl}/payment-status`);
                const data = await response.json();
                if (data && data.status === 'closed') {
                    await handlePaymentConfirmation(data);
                }
            } catch (error) {
                console.error('Error al verificar el estado del pago:', error);
            }
        }, 5000);
    };

    const stopPolling = () => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    };

    const onProcesarPagoMercadoPago = async () => {
        setShowQrModal(true);
        setLoadingQr(true);
        try {
            const userId = import.meta.env.VITE_USER_ID;
            const externalPosId = import.meta.env.VITE_EXTERNAL_POS_ID;
            const data = {
                external_reference: `reference_${venta.clienteId}`,
                title: 'Product order',
                description: 'Purchase description.',
                total_amount: venta.total,
                items: venta.productos.map(producto => ({
                    sku_number: producto.inventarioId.toString(),
                    category: 'marketplace',
                    title: producto.nombre,
                    description: producto.descripcion,
                    unit_price: producto.precioUnitario,
                    quantity: producto.cantidad,
                    unit_measure: 'unit',
                    total_amount: producto.subtotal
                })),
                cash_out: { amount: 0 }
            };
            const response = await crearOrdenQRRequest(data, userId, externalPosId);
            setQrData(response.qr_data);
            setLoadingQr(false);
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error);
            setLoadingQr(false);
        }
    };

    const handlePaymentConfirmation = async (orderDetails) => {
        try {
            stopPolling();
            const { external_reference, items, total_amount } = orderDetails;
            const clienteId = external_reference.split('_')[1];
            const productosMapeados = items.map(item => ({
                inventarioId: item.sku_number,
                cantidad: item.quantity,
                precioUnitario: item.unit_price,
                subtotal: item.unit_price * item.quantity
            }));
            const ventaData = { clienteId, vendedorId: venta.vendedorId, productos: productosMapeados, total: total_amount };
            setShowQrModal(false);
            await procesarPagoMercadoPagoRequest(ventaData);
            setPaymentStatus('success');
            setShowConfirmationModal(true);
        } catch (error) {
            console.error('Error al procesar el pago con Mercado Pago:', error);
            setPaymentStatus('error');
            setShowConfirmationModal(true);
        }
    };

    return (
        <div className="container-page">
            <h1 className="text-3xl font-bold mb-4">Registrar Venta</h1>
            <RegistrarVentaForm
                clientes={clientes}
                productos={productos}
                venta={venta}
                setVenta={setVenta}
                onProcesarPagoMercadoPago={onProcesarPagoMercadoPago}
            />
            <Modal show={showQrModal} onHide={() => setShowQrModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Escanee el QR para completar el pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingQr ? <Spinner animation="border" /> : <QRCode value={qrData} size={256} />}
                </Modal.Body>
            </Modal>
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{paymentStatus === 'success' ? 'Pago Exitoso' : 'Error en el Pago'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paymentStatus === 'success' ? 'El pago se ha procesado correctamente.' : 'Hubo un error al procesar el pago.'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowConfirmationModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegistrarVenta;