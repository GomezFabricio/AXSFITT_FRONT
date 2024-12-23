import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getRolesByUserIdRequest } from '../../api/usuarios.api';

const NavBar = ({ isSidebarOpen, toggleSidebar }) => {
    const [menuOptions, setMenuOptions] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedMenuOptions = localStorage.getItem('menuOptions');
        if (storedMenuOptions) {
            setMenuOptions(JSON.parse(storedMenuOptions));
        } else {
            setError('No hay opciones de menú disponibles');
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                });

                const fetchRoles = async () => {
                    try {
                        const response = await getRolesByUserIdRequest(decodedToken.userId);
                        setRoles(response.data);
                    } catch (err) {
                        console.error('Error al obtener los roles:', err);
                    }
                };

                fetchRoles();
            } catch (err) {
                console.error('Error al decodificar el token:', err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('menuOptions');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState); // Cambia el estado al hacer clic
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuOptionClick = () => {
        if (isSidebarOpen) {
            toggleSidebar(); // Cierra el sidebar
        }
        setDropdownVisible(false); // Asegura que se cierre el dropdown
    };

    return (
        <div>
            {/* Header para dispositivos móviles y tablets */}
            <header className="flex lg:hidden justify-between items-center p-4 shadow-lg" style={{ backgroundColor: 'var(--color-principal-darkest)', color: 'var(--color-letras-botones)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="flex-grow"></div> {/* Espaciador para empujar el botón a la derecha */}
                <button
                    onClick={toggleSidebar}
                    className={`text-2xl focus:outline-none z-50 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}
                    style={{ color: 'var(--color-letras-botones)' }}
                >
                    ☰
                </button>
            </header>

            {/* Menú lateral para móviles y tablets */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 z-40 transition-transform transform lg:hidden ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } shadow-lg`}
                style={{ backgroundColor: 'var(--color-principal-darker)', boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.1)' }}
            >
                <div className="p-4 flex justify-between items-center">

                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none z-50 mb-2"
                        style={{ color: 'var(--color-letras-botones)' }}
                    >
                        ☰
                    </button>

                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-letras-botones)' }}>Mi Aplicación</h1>
                    
                </div>
                <ul className="space-y-2 px-4">
                    {menuOptions.length > 0 ? (
                        menuOptions.map((option, index) => (
                            <li
                                key={index}
                                className="hover:bg-black hover:text-white px-4 py-3 border-b border-white border-opacity-10 transform transition-transform duration-200 hover:translate-y-1 text-right"
                            >
                                <Link
                                    to={`/${option.toLowerCase().replace(/\s/g, '-')}`}
                                    className="text-white no-underline"
                                    onClick={handleMenuOptionClick}
                                >
                                    {option}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li style={{ color: 'var(--color-letras-botones)' }}>Cargando opciones...</li>
                    )}
                </ul>
                <div className="mt-auto p-4">
                    {user && (
                        <div>
                            <div className="w-full px-4 py-2 text-right" style={{ backgroundColor: 'var(--color-principal-dark)', color: 'var(--color-letras-botones)' }}>
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="mt-2 p-2 space-y-2 z-50 relative rounded-md shadow-lg" style={{ backgroundColor: 'var(--color-principal-dark)', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                <Link
                                    to="/mi-perfil"
                                    className="block text-white no-underline hover:bg-black hover:text-white px-4 py-2 border-b border-white border-opacity-10 transform transition-transform duration-200 hover:translate-y-1 text-right"
                                    onClick={handleMenuOptionClick}
                                    style={{ color: 'var(--color-letras-botones)' }}
                                >
                                    Mi perfil
                                </Link>
                                {roles.length > 1 && (
                                    <Link
                                        to="/seleccion-rol"
                                        className="block text-white no-underline hover:bg-black hover:text-white px-4 py-2 border-b border-white border-opacity-10 transform transition-transform duration-200 hover:translate-y-1 text-right"
                                        onClick={handleMenuOptionClick}
                                        style={{ color: 'var(--color-letras-botones)' }}
                                    >
                                        Roles
                                    </Link>
                                )}
                                <button
                                    onClick={() => { 
                                        handleLogout();
                                        handleMenuOptionClick();
                                    }}
                                    className="block w-full px-4 py-2 hover:bg-red-600 transform transition-transform duration-200 hover:translate-y-1 text-right"
                                    style={{ color: 'var(--color-letras-botones)' }}
                                >
                                    Salir
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Navbar para dispositivos de resolución superior */}
            <nav className="hidden lg:flex items-center justify-between px-8 py-4 shadow-lg" style={{ backgroundColor: 'var(--color-principal-darkest)', color: 'var(--color-letras-botones)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="flex items-center space-x-8">
                    {menuOptions.length > 0 ? (
                        menuOptions.map((option, index) => (
                            <Link
                                key={index}
                                to={`/${option.toLowerCase().replace(/\s/g, '-')}`}
                                className="text-white no-underline border-b border-white border-opacity-50 pb-1 transform transition-transform duration-200 hover:translate-y-1"
                                onClick={handleMenuOptionClick}
                                style={{ color: 'var(--color-letras-botones)' }}
                            >
                                {option}
                            </Link>
                        ))
                    ) : (
                        <span style={{ color: 'var(--color-letras-botones)' }}>Cargando opciones...</span>
                    )}
                </div>
                {user && (
                    <div className="relative">
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleDropdown}
                            style={{ color: 'var(--color-letras-botones)' }}
                        >
                            {user.firstName} {user.lastName}
                        </button>
                        {dropdownVisible && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 shadow-lg py-2 z-50" style={{ backgroundColor: 'var(--color-principal-darker)' }}>
                                <Link
                                    to="/mi-perfil"
                                    className="block px-4 py-2 text-white no-underline hover:bg-black hover:text-white transform transition-transform duration-200 hover:translate-y-1"
                                    onClick={handleMenuOptionClick}
                                    style={{ color: 'var(--color-letras-botones)' }}
                                >
                                    Mi perfil
                                </Link>
                                {roles.length > 1 && (
                                    <Link
                                        to="/seleccion-rol"
                                        className="block px-4 py-2 text-white no-underline hover:bg-black hover:text-white transform transition-transform duration-200 hover:translate-y-1"
                                        onClick={handleMenuOptionClick}
                                        style={{ color: 'var(--color-letras-botones)' }}
                                    >
                                        Roles
                                    </Link>
                                )}
                                <button
                                    onClick={() => { 
                                        handleLogout(); 
                                        handleMenuOptionClick(); 
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-red-600 transform transition-transform duration-200 hover:translate-y-1"
                                    style={{ color: 'var(--color-letras-botones)' }}
                                >
                                    Salir
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;