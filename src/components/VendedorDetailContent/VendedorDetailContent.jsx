import React from 'react';
import './VendedorDetailContent.css';
import { FaTrash, FaEdit, FaDollarSign } from 'react-icons/fa';

const VendedorDetailContent = ({
    nombre,
    apellido,
    dni,
    comisionPorcentaje,
    ventasRealizadas,
    comisionesAcumuladas,
    comisionesPendientes,
    onDelete,
    onUpdate,
    onLiquidar
}) => {

    return (
        <div className="vendedor-detail-container">
            <div className="vendedor-detail-header">
                <h2>{`${nombre} ${apellido}`}</h2>
                <p>DNI: {dni}</p>
            </div>

            <div className="vendedor-detail-info">
                <p>Comisión (Porcentaje): {comisionPorcentaje}%</p>
                <p>Ventas Realizadas: {ventasRealizadas}</p>
                <p>Comisiones Acumuladas: ${comisionesAcumuladas}</p>
                <p>Comisiones Pendientes: ${comisionesPendientes}</p>
            </div>

            <div className="vendedor-detail-buttons">
                <button className="btn-client btn-edit" onClick={onUpdate}>
                    <FaEdit /> Editar
                </button>
                <button className="btn-client btn-delete" onClick={onDelete}>
                    <FaTrash /> Eliminar
                </button>
                <button className="btn-client btn-liquidar" onClick={onLiquidar}>
                    <FaDollarSign /> Liquidar
                </button>
            </div>
        </div>
    );
};

export default VendedorDetailContent;