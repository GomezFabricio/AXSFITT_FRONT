import React from 'react';
import '../../assets/styles/forms.css';
import './FormularioPersona.css';

const FormularioPersona = ({ handleChange, values, errors, touched, handleBlur }) => {
    return (
        <div className="formulario-persona">
            {/* Fila para Nombre y Apellido */}
            <div className="form-row">
                <div className="form-group">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name='persona_nombre' 
                        onChange={handleChange} 
                        value={values.persona_nombre || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_nombre && errors.persona_nombre && <div className="error-message">{errors.persona_nombre}</div>}
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name='persona_apellido' 
                        onChange={handleChange} 
                        value={values.persona_apellido || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_apellido && errors.persona_apellido && <div className="error-message">{errors.persona_apellido}</div>}
                </div>
            </div>

            {/* Fila para DNI y Teléfono */}
            <div className="form-row">
                <div className="form-group">
                    <label>DNI</label>
                    <input 
                        type="number" 
                        name='persona_dni' 
                        onChange={handleChange} 
                        onBlur={handleBlur} // Manejar el evento onBlur
                        value={values.persona_dni || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_dni && errors.persona_dni && <div className="error-message">{errors.persona_dni}</div>}
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                        type="number" 
                        name='persona_telefono' 
                        onChange={handleChange} 
                        value={values.persona_telefono || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_telefono && errors.persona_telefono && <div className="error-message">{errors.persona_telefono}</div>}
                </div>
            </div>

            {/* Fila para Fecha de Nacimiento y Domicilio */}
            <div className="form-row">
                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input 
                        type="date" 
                        name='persona_fecha_nacimiento' 
                        onChange={handleChange} 
                        value={values.persona_fecha_nacimiento || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_fecha_nacimiento && errors.persona_fecha_nacimiento && <div className="error-message">{errors.persona_fecha_nacimiento}</div>}
                </div>
                <div className="form-group">
                    <label>Domicilio</label>
                    <input 
                        type="text" 
                        name='persona_domicilio' 
                        onChange={handleChange} 
                        value={values.persona_domicilio || ''} // Vincular el valor con valor por defecto
                    />
                    {touched.persona_domicilio && errors.persona_domicilio && <div className="error-message">{errors.persona_domicilio}</div>}
                </div>
            </div>
        </div>
    );
}

export default FormularioPersona;