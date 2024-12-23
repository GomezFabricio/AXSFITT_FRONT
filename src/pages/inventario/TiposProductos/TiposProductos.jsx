    import React, { useEffect, useState } from 'react';
    import { Formik } from 'formik';
    import * as Yup from 'yup';
    import { tiposProductosList, agregarTipoProducto, eliminarTipoProducto, editarTipoProducto, verTiposProductosInactivos, reactivarTipoProducto } from '../../../api/inventario.api';
    import TiposProductosList from '../../../components/TiposProductosList/TiposProductosList';
    import TiposProductosInactivosList from '../../../components/TiposProductosInactivosList/TiposProductosInactivosList';
    import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
    import FormularioTiposProductos from '../../../components/FormularioTiposProductos/FormularioTiposProductos';
    import { useNavigate } from 'react-router-dom';
    import './TiposProductos.css';
    
    const TiposProductos = () => {
        const [tiposProductos, setTiposProductos] = useState([]);
        const [tiposProductosInactivos, setTiposProductosInactivos] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [showInactivos, setShowInactivos] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [formValues, setFormValues] = useState(null);
        const [isEditing, setIsEditing] = useState(false);
    
        useEffect(() => {
            const fetchTiposProductos = async () => {
                try {
                    const data = await tiposProductosList();
                    setTiposProductos(data);
                } catch (error) {
                    console.error('Error fetching tipos de productos:', error);
                    setTiposProductos([]);
                }
            };
    
            fetchTiposProductos();
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
    
        const handleTipoProductoAgregado = async () => {
            const data = await tiposProductosList();
            setTiposProductos(data);
            if (showInactivos) {
                const inactivosData = await verTiposProductosInactivos();
                setTiposProductosInactivos(inactivosData);
            }
        };
    
        const handleDelete = async (idTipoProducto) => {
            try {
                await eliminarTipoProducto(idTipoProducto);
                const updatedTiposProductos = tiposProductos.filter(tipoProducto => tipoProducto.idTipoProducto !== idTipoProducto);
                setTiposProductos(updatedTiposProductos);
                if (showInactivos) {
                    const inactivosData = await verTiposProductosInactivos();
                    setTiposProductosInactivos(inactivosData);
                }
            } catch (error) {
                console.error('Error eliminando tipo de producto:', error);
                setErrorMessage(error.message || 'No se puede eliminar el tipo de producto porque está asociado a uno o más productos.');
            }
        };
    
        const handleEdit = (tipoProducto) => {
            setFormValues({
                idTipoProducto: tipoProducto.idTipoProducto,
                nombreTipoProducto: tipoProducto.nombreTipoProducto,
            });
            setIsEditing(true);
            setShowModal(true);
        };
    
        const handleReactivar = async (idTipoProducto) => {
            try {
                await reactivarTipoProducto(idTipoProducto);
                const updatedTiposProductosInactivos = tiposProductosInactivos.filter(tipoProducto => tipoProducto.idTipoProducto !== idTipoProducto);
                setTiposProductosInactivos(updatedTiposProductosInactivos);
                handleTipoProductoAgregado();
            } catch (error) {
                console.error('Error reactivando tipo de producto:', error);
            }
        };
    
        const handleToggleInactivos = async () => {
            setShowInactivos(!showInactivos);
            if (!showInactivos) {
                try {
                    const data = await verTiposProductosInactivos();
                    console.log('Datos inactivos:', data); // Agregar console.log para depurar
                    setTiposProductosInactivos(data);
                } catch (error) {
                    console.error('Error fetching tipos de productos inactivos:', error);
                    setTiposProductosInactivos([]);
                }
            }
        };
    
        const initialValues = {
            nombreTipoProducto: '',
        };
    
        const validationSchema = Yup.object({
            nombreTipoProducto: Yup.string().required('El nombre del tipo de producto es obligatorio'),
        });
    
        const handleSubmit = async (values, { setSubmitting }) => {
            try {
                if (isEditing) {
                    await editarTipoProducto(formValues.idTipoProducto, values);
                } else {
                    await agregarTipoProducto(values.nombreTipoProducto);
                }
                handleTipoProductoAgregado();
                handleCloseModal();
            } catch (error) {
                console.error('Error agregando/editando tipo de producto:', error);
            } finally {
                setSubmitting(false);
            }
        };
    
        return (
            <div className="container-page">
                <div className="header">
                    <h1>Tipos de Productos</h1>
                    <div className="buttons-container">
                        <button className="agregar-button" onClick={handleAgregarClick}>
                            Agregar Tipo de Producto
                        </button>
                    </div>
                </div>
                <h2>En esta sección podrás ver y gestionar los tipos de productos.</h2>
                <MenuEnInventario />
    
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    
                <TiposProductosList tiposProductos={tiposProductos} onDelete={handleDelete} onEdit={handleEdit} />
    
                <div className="mt-10">
                    <button className={`toggle-inactivos-button ${showInactivos ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-800'} text-white font-bold py-2 px-4 rounded`} onClick={handleToggleInactivos}>
                        {showInactivos ? 'Ocultar Inactivos' : 'Mostrar Inactivos'}
                    </button>
                </div>
    
                {showInactivos && (
                    <TiposProductosInactivosList tiposProductos={tiposProductosInactivos} onReactivar={handleReactivar} />
                )}
    
                {showModal && (
                    <Formik
                        initialValues={formValues || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ handleSubmit }) => (
                            <FormularioTiposProductos handleSubmit={handleSubmit} onClose={handleCloseModal} isEditing={isEditing} />
                        )}
                    </Formik>
                )}
            </div>
        );
    };
    
    export default TiposProductos;