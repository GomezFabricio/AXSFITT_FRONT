import React from 'react';
import '../../assets/styles/forms.css';
import './LoginForm.css';

const LoginForm = ({ handleChange, values }) => {
    return (
        <div className="login-form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={values.email || ''} // Vincular el valor con valor por defecto
                    placeholder="Ingrese su email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password || ''} // Vincular el valor con valor por defecto
                    placeholder="Ingrese su contraseña"
                />
            </div>
        </div>
    );
};

export default LoginForm;
