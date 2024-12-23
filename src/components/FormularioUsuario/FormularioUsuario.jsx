import React from 'react';
import '../../assets/styles/forms.css';
import './FormularioUsuario.css';

const FormularioUsuario = ({ handleChange, values = {}, errors, touched, disablePassword = false, disableEmail = false }) => {
    return (
        <div className="formulario-usuario">
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name='usuario_email'
                    value={values.usuario_email || ''}
                    onChange={handleChange}
                    disabled={disableEmail} 
                />
                {touched.usuario_email && errors.usuario_email && (
                    <div className="error-message">{errors.usuario_email}</div>
                )}
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name='usuario_pass'
                    value={values.usuario_pass || ''}
                    onChange={handleChange}
                    disabled={disablePassword} // Deshabilitar el campo de contraseña
                />
                {touched.usuario_pass && errors.usuario_pass && (
                    <div className="error-message">{errors.usuario_pass}</div>
                )}
            </div>
        </div>
    );
}

export default FormularioUsuario;