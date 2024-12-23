import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [roles, setRoles] = useState(() => {
        // Restaurar los roles desde localStorage (o un array vacío si no existe)
        const savedRoles = localStorage.getItem('roles');
        return savedRoles ? JSON.parse(savedRoles) : [];
    });

    // Efecto para guardar los roles en localStorage cuando cambian
    useEffect(() => {
        if (roles.length > 0) {
            localStorage.setItem('roles', JSON.stringify(roles));
        } else {
            localStorage.removeItem('roles');
        }
    }, [roles]);

    return (
        <UserContext.Provider value={{ roles, setRoles }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};