import React from 'react';
import './VendedorCard.css'

const VendedorCard = ({ nombre, apellido, dni, ventasRealizadas, comisionesPendientes, onDetalleClick }) => {
    return (
        <div className="vendedor-card">
            <h2>{`${nombre} ${apellido}`}</h2>
            <p>DNI: {dni}</p>
            <p>Ventas Realizadas: {ventasRealizadas}</p>
            <p>Comisiones Pendientes: {comisionesPendientes}</p>
            <button onClick={onDetalleClick}>Detalle</button>
        </div>
    );
};

export default VendedorCard;