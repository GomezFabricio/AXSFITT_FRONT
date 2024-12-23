import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MenuEnInventario.css';

const MenuEnInventario = () => {
    const location = useLocation();

    return (
        <div className="menu-en-inventario">
            <ul className="menu-tabs">
                <li className={location.pathname === '/inventario' ? 'active' : ''}>
                    <Link to="/inventario">
                        Inventario
                    </Link>
                </li>
                <li className={location.pathname === '/productos' ? 'active' : ''}>
                    <Link to="/productos">
                        Productos
                    </Link>
                </li>
                <li className={location.pathname === '/tipos-productos' ? 'active' : ''}>
                    <Link to="/tipos-productos">
                        Tipos de Productos
                    </Link>
                </li>
                <li className={location.pathname === '/marcas-productos' ? 'active' : ''}>
                    <Link to="/marcas-productos">
                        Marcas de Productos
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuEnInventario;