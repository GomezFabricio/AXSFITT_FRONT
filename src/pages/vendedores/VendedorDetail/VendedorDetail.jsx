import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getVendedorRequest, deactivateVendedor, liquidarComisiones } from '../../../api/vendedores.api';
import VendedorDetailContent from '../../../components/VendedorDetailContent/VendedorDetailContent';
import { Modal, Button } from 'react-bootstrap';

const VendedorDetail = () => {
  const { id } = useParams();
  const [vendedor, setVendedor] = useState(null);
  const [showLiquidarModal, setShowLiquidarModal] = useState(false);
  const [showNoComisionesModal, setShowNoComisionesModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendedor = async () => {
      const response = await getVendedorRequest(id);
      setVendedor(response.data);
    };
    fetchVendedor();
  }, [id]);

  const handleDelete = async () => {
    try {
        await deactivateVendedor(id); 
        navigate('/vendedores');  // Redireccionamos al listado de vendedores al eliminar el vendedor
    } catch (error) {
        console.error("Error al eliminar el vendedor:", error);
    }
  };

  const handleUpdate = async () => {
    navigate(`/vendedor/${id}/edit`); // Navegamos a la página de edición del vendedor
  };

  const handleLiquidar = async () => {
    if (vendedor.comisiones_pendientes > 0) {
      setShowLiquidarModal(true);
    } else {
      setShowNoComisionesModal(true);
    }
  };

  const handleConfirmLiquidar = async () => {
    try {
        await liquidarComisiones(id);
        setShowLiquidarModal(false);
        const response = await getVendedorRequest(id);
        setVendedor(response.data); // Actualizar la información del vendedor después de liquidar las comisiones
    } catch (error) {
        console.error("Error al liquidar las comisiones:", error);
    }
  };

  const handleCancelLiquidar = () => {
    setShowLiquidarModal(false);
  };

  const handleCloseNoComisionesModal = () => {
    setShowNoComisionesModal(false);
  };

  if (!vendedor) {
    return <p>Cargando...</p>; 
  }

  return (
    <div className="container-page">
      <h1>Detalles de Vendedor</h1>
      <VendedorDetailContent
        nombre={vendedor.persona_nombre}
        apellido={vendedor.persona_apellido}
        dni={vendedor.persona_dni}
        comisionPorcentaje={vendedor.vendedor_comision_porcentaje}
        ventasRealizadas={vendedor.ventas_realizadas}
        comisionesAcumuladas={vendedor.comisiones_acumuladas}
        comisionesPendientes={vendedor.comisiones_pendientes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onLiquidar={handleLiquidar}
      />

      <Modal show={showLiquidarModal} onHide={handleCancelLiquidar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Liquidar Comisiones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás a punto de liquidar a {vendedor.persona_nombre} {vendedor.persona_apellido} ${vendedor.comisiones_pendientes}. ¿Estás seguro?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLiquidar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmLiquidar}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNoComisionesModal} onHide={handleCloseNoComisionesModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sin Comisiones Pendientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>No hay comisiones pendientes a liquidar.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseNoComisionesModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendedorDetail;