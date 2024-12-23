import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { marcasList, agregarMarca, eliminarMarca, editarMarca, verMarcasInactivas, reactivarMarca } from '../../../api/inventario.api';
import MarcasList from '../../../components/MarcasList/MarcasList';
import MarcasInactivasList from '../../../components/MarcasInactivasList/MarcasInactivasList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioMarcas from '../../../components/FormularioMarcas/FormularioMarcas';
import { useNavigate } from 'react-router-dom';
import './MarcasProductos.css';

const MarcasProductos = () => {
    const [marcas, setMarcas] = useState([]);
    const [marcasInactivas, setMarcasInactivas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showInactivos, setShowInactivos] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const data = await marcasList();
                setMarcas(data);
            } catch (error) {
                console.error('Error fetching marcas:', error);
                setMarcas([]);
            }
        };

        fetchMarcas();
    }, []);

    const navigate = useNavigate();

    const handleAgregarClick = () => {
        setFormValues(initialValues);
        setShowModal(true);
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMarcaAgregada = async () => {
        const data = await marcasList();
        setMarcas(data);
        if (showInactivos) {
            const inactivosData = await verMarcasInactivas();
            setMarcasInactivas(inactivosData);
        }
    };

    const handleDelete = async (idMarcaProducto) => {
        try {
            await eliminarMarca(idMarcaProducto);
            const updatedMarcas = marcas.filter(marca => marca.idMarcaProducto !== idMarcaProducto);
            setMarcas(updatedMarcas);
            const inactivosData = await verMarcasInactivas();
            setMarcasInactivas(inactivosData);
        } catch (error) {
            console.error('Error eliminando marca:', error);
            setErrorMessage(error.message || 'No se puede eliminar la marca porque está asociada a uno o más productos.');
        }
    };

    const handleEdit = (marca) => {
        setFormValues({
            idMarcaProducto: marca.idMarcaProducto,
            nombreMarcaProducto: marca.nombreMarcaProducto,
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleReactivar = async (idMarcaProducto) => {
        try {
            await reactivarMarca(idMarcaProducto);
            const updatedMarcasInactivas = marcasInactivas.filter(marca => marca.marca_producto_id !== idMarcaProducto);
            setMarcasInactivas(updatedMarcasInactivas);
            handleMarcaAgregada();
        } catch (error) {
            console.error('Error reactivando marca:', error);
        }
    };

    const handleToggleInactivos = async () => {
        setShowInactivos(!showInactivos);
        if (!showInactivos) {
            try {
                const data = await verMarcasInactivas();
                setMarcasInactivas(data);
            } catch (error) {
                console.error('Error fetching marcas inactivas:', error);
                setMarcasInactivas([]);
            }
        }
    };

    const initialValues = {
        nombreMarcaProducto: '',
    };

    const validationSchema = Yup.object({
        nombreMarcaProducto: Yup.string().required('El nombre de la marca es obligatorio'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (isEditing) {
                await editarMarca(formValues.idMarcaProducto, values);
            } else {
                await agregarMarca(values.nombreMarcaProducto);
            }
            handleMarcaAgregada();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando/editando marca:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Marcas de Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Marca
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar las marcas de productos.</h2>
            <MenuEnInventario />

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <MarcasList marcas={marcas} onDelete={handleDelete} onEdit={handleEdit} />

            <div className="mt-10">
                <button className={`toggle-inactivos-button ${showInactivos ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-800'} text-white font-bold py-2 px-4 rounded`} onClick={handleToggleInactivos}>
                    {showInactivos ? 'Ocultar Inactivos' : 'Mostrar Inactivos'}
                </button>
            </div>

            {showInactivos && (
                <MarcasInactivasList marcas={marcasInactivas} onReactivar={handleReactivar} />
            )}

            {showModal && (
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit }) => (
                        <FormularioMarcas handleSubmit={handleSubmit} onClose={handleCloseModal} isEditing={isEditing} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default MarcasProductos;