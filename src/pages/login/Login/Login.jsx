import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link
import LoginForm from '../../../components/LoginForm/LoginForm';
import { loginRequest } from '../../../api/login.api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    return (
        <div className="container-page">
            <h1>Iniciar Sesión</h1>
            {error && <div className="error">{error}</div>}
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) => {
                    try {
                        const response = await loginRequest(values);
                        const { token } = response.data;
                        localStorage.setItem('token', token);

                        // Redirigir a la página de selección de roles y recargar la página
                        navigate('/seleccion-rol');
                        window.location.reload();
                    } catch (err) {
                        setError('Error en el inicio de sesión. Intenta nuevamente.');
                    }
                }}
            >
                {({ handleChange, values }) => (
                    <Form className="form">
                        <LoginForm handleChange={handleChange} values={values} />
                        <div className="link-container">
                            <Link to="/request-password-reset" className="button-recover">Recuperar Contraseña</Link>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="button-login">Iniciar Sesión</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;