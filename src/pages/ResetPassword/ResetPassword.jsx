import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import config from '../../config/config';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.frontendUrl}/reset-password/${token}`, { newPassword });
            setMessage(response.data.message);
            setModalIsOpen(true); // Mostrar el modal
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/login'); // Redirigir al login
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-gray-800 text-white rounded">
                Volver
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Restablecer Contraseña</button>
            </form>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;