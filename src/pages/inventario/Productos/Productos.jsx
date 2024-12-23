import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { productosList, agregarProducto, eliminarProducto, editarProducto, verProductosInactivos, reactivarProducto } from '../../../api/inventario.api';
import ProductosList from '../../../components/ProductosList/ProductosList';
import ProductosInactivosList from '../../../components/ProductosInactivosList/ProductosInactivosList';
import MenuEnInventario from '../../../components/MenuEnInventario/MenuEnInventario';
import FormularioProducto from '../../../components/FormularioProducto/FormularioProducto';
import { useNavigate } from 'react-router-dom';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [productosInactivos, setProductosInactivos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showInactivos, setShowInactivos] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formValues, setFormValues] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productosList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                setProductos([]);
            }
        };

        fetchProductos();
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

    const handleProductoAgregado = async () => {
        const data = await productosList();
        setProductos(data);
        if (showInactivos) {
            const inactivosData = await verProductosInactivos();
            setProductosInactivos(inactivosData);
        }
    };

    const handleDelete = async (idProducto) => {
        try {
            await eliminarProducto(idProducto);
            const updatedProductos = productos.filter(producto => producto.idProducto !== idProducto);
            setProductos(updatedProductos);
            const inactivosData = await verProductosInactivos();
            setProductosInactivos(inactivosData);
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setErrorMessage(error.message || 'No se puede eliminar el producto porque está asociado a uno o más registros.');
        }
    };

    const handleEdit = (producto) => {
        setFormValues({
            idProducto: producto.idProducto,
            CodigoBarras: producto.CodigoBarras,
            Producto: producto.Producto,
            TipoProducto: producto.TipoProducto,
            MarcaProducto: producto.MarcaProducto
        });
        setShowModal(true);
        setIsEditing(true);
    };

    const handleReactivar = async (idProducto) => {
        try {
            await reactivarProducto(idProducto);
            const updatedProductosInactivos = productosInactivos.filter(producto => producto.idProducto !== idProducto);
            setProductosInactivos(updatedProductosInactivos);
            handleProductoAgregado();
        } catch (error) {
            console.error('Error reactivando producto:', error);
        }
    };

    const handleToggleInactivos = async () => {
        setShowInactivos(!showInactivos);
        if (!showInactivos) {
            try {
                const data = await verProductosInactivos();
                setProductosInactivos(data);
            } catch (error) {
                console.error('Error fetching productos inactivos:', error);
                setProductosInactivos([]);
            }
        }
    };

    const initialValues = {
        CodigoBarras: '',
        Producto: '',
        TipoProducto: '',
        MarcaProducto: ''
    };

    const validationSchema = Yup.object({
        CodigoBarras: Yup.string().required('El código de barras es obligatorio'),
        Producto: Yup.string().required('El nombre del producto es obligatorio'),
        TipoProducto: Yup.string().required('El tipo de producto es obligatorio'),
        MarcaProducto: Yup.string().required('La marca del producto es obligatoria')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (isEditing) {
                await editarProducto(formValues.idProducto, values);
            } else {
                await agregarProducto(values);
            }
            handleProductoAgregado();
            handleCloseModal();
        } catch (error) {
            console.error('Error agregando/editando producto:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-page">
            <div className="header">
                <h1>Productos</h1>
                <div className="buttons-container">
                    <button className="agregar-button" onClick={handleAgregarClick}>
                        Agregar Producto
                    </button>
                </div>
            </div>
            <h2>En esta sección podrás ver y gestionar los productos.</h2>
            <MenuEnInventario />

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <ProductosList productos={productos} onDelete={handleDelete} onEdit={handleEdit} />

            <div className="mt-10">
                <button className={`toggle-inactivos-button ${showInactivos ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-800'} text-white font-bold py-2 px-4 rounded`} onClick={handleToggleInactivos}>
                    {showInactivos ? 'Ocultar Inactivos' : 'Mostrar Inactivos'}
                </button>
            </div>

            {showInactivos && (
                <ProductosInactivosList productos={productosInactivos} onReactivar={handleReactivar} />
            )}

            {showModal && (
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit }) => (
                        <FormularioProducto handleSubmit={handleSubmit} onClose={handleCloseModal} isEditing={isEditing} />
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Productos;