import React from 'react';

const Footer = () => {
    return (
        <footer className="p-3 shadow-md w-full flex flex-col items-center" style={{ backgroundColor: 'var(--color-principal-darker)', color: 'var(--color-letras-botones)' }}>
            <p>Sistema aXsFitt - Gestiona tus ventas y productos eficientemente</p>
            <p>© 2024 aXsFitt. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;