import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:4000/request-password-reset', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-gray-800 text-white rounded">
                ← Volver
            </button>
            <h1 className="text-2xl font-bold mb-4">Recuperación de Contraseña</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Enviar
                </button>
            </form>
            {message && <p className="text-red-500 text-xs italic">{message}</p>}
        </div>
    );
};

export default RequestPasswordReset;