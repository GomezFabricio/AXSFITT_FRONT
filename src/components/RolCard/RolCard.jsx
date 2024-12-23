import React from 'react';
import './RolCard.css';

const RolCard = ({ rolNombre, onClick }) => {
    return (
        <div className="rol-card" onClick={onClick}>
            <h2>{rolNombre}</h2>
        </div>
    );
};

export default RolCard;
