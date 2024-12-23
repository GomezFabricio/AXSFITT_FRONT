import React from 'react';
import './FormularioRol.css';

const FormularioRol = ({ roles, selectedRoles, setSelectedRoles }) => {
    const handleRolesChange = (e) => {
        // Convertir las opciones seleccionadas en un array de IDs de roles
        setSelectedRoles(Array.from(e.target.selectedOptions, (option) => parseInt(option.value)));
    };

    return (
        <div className="formulario-rol">
            <label>Roles</label>
            <select multiple={true} value={selectedRoles} onChange={handleRolesChange} className="roles-select">
                {roles.map((rol) => (
                    <option key={rol.rol_id} value={rol.rol_id}>
                        {rol.rol_tipo_rol}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormularioRol;