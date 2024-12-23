import React, { useState, useEffect } from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import './FormularioInventario.css';
import { productosList } from '../../api/inventario.api';

const FormularioInventario = ({ handleSubmit, onClose, setFieldValue, isSubmitting, errorMessage, showWarning, handleReingreso, isReingreso, formValues, isEditing }) => {
    const [productos, setProductos] = useState([]);
    const [codigoBarras, setCodigoBarras] = useState('');
    const [disablePrecioVenta, setDisablePrecioVenta] = useState(false);
    const [disableIncremento, setDisableIncremento] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productosList();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleCodigoBarrasChange = (event) => {
        const codigoBarras = event.target.value;
        setCodigoBarras(codigoBarras);
        const producto = productos.find(p => p.CodigoBarras === codigoBarras);
        if (producto) {
            setFieldValue('productoId', producto.idProducto);
        }
    };

    const handleIncrementoChange = (event) => {
        const incremento = event.target.value;
        setFieldValue('incremento', incremento);
        setDisablePrecioVenta(incremento !== '');
        if (incremento !== '') {
            setFieldValue('precioVenta', '');
        }
    };

    const handlePrecioVentaChange = (event) => {
        const precioVenta = event.target.value;
        setFieldValue('precioVenta', precioVenta);
        setDisableIncremento(precioVenta !== '');
        if (precioVenta !== '') {
            setFieldValue('incremento', '');
        }
    };

    useEffect(() => {
        if (formValues) {
            setCodigoBarras(formValues.codigoBarras || '');
            setDisableIncremento(!!formValues.precioVenta);
            setDisablePrecioVenta(!!formValues.incremento);
        } else {
            setCodigoBarras('');
            setDisableIncremento(false);
            setDisablePrecioVenta(false);
        }
    }, [formValues]);

    useEffect(() => {
        if (!isReingreso) {
            setDisablePrecioVenta(false);
            setDisableIncremento(false);
        }
    }, [isReingreso]);

    return (
        <div className="modal-inventario">
            <div className="modal-content-inventario">
                <span className="close-inventario" onClick={onClose}>&times;</span>
                <h2>{isEditing ? 'Editar Inventario' : isReingreso ? 'Reingreso de Inventario' : 'Registrar Nuevo Ingreso'}</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Form className="form-inventario" onSubmit={handleSubmit}>
                    <label htmlFor="codigoBarras" className="label-inventario">Código de Barras:</label>
                    <Field type="text" id="codigoBarras" name="codigoBarras" className="input-inventario" value={codigoBarras} onChange={handleCodigoBarrasChange} disabled={isReingreso || isEditing} />
                    <ErrorMessage name="codigoBarras" component="div" className="error-inventario" />

                    <label htmlFor="productoId" className="label-inventario">Producto:</label>
                    <Field as="select" id="productoId" name="productoId" className="input-inventario" disabled={isReingreso || isEditing}>
                        <option value="">Seleccione un producto</option>
                        {productos.map(producto => (
                            <option key={producto.idProducto} value={producto.idProducto}>{producto.Producto}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="productoId" component="div" className="error-inventario" />

                    <label htmlFor="cantidad" className="label-inventario">Cantidad:</label>
                    <Field type="number" id="cantidad" name="cantidad" className="input-inventario" />
                    <ErrorMessage name="cantidad" component="div" className="error-inventario" />

                    <label htmlFor="precioCosto" className="label-inventario">Precio de Costo:</label>
                    <Field type="number" id="precioCosto" name="precioCosto" className="input-inventario" />
                    <ErrorMessage name="precioCosto" component="div" className="error-inventario" />

                    <label htmlFor="incremento" className="label-inventario">Incremento (%):</label>
                    <Field type="number" id="incremento" name="incremento" className="input-inventario" onChange={handleIncrementoChange} disabled={disableIncremento} />
                    <ErrorMessage name="incremento" component="div" className="error-inventario" />

                    <label htmlFor="precioVenta" className="label-inventario">Precio de Venta:</label>
                    <Field type="number" id="precioVenta" name="precioVenta" className="input-inventario" onChange={handlePrecioVentaChange} disabled={disablePrecioVenta} />
                    <ErrorMessage name="precioVenta" component="div" className="error-inventario" />

                    <button type="submit" className="button-inventario" disabled={isSubmitting}>{isEditing ? 'Actualizar' : isReingreso ? 'Reingresar' : 'Registrar'}</button>
                </Form>

                {showWarning && (
                    <div className="warning-modal">
                        <div className="warning-content">
                            <p>El producto ya se encuentra registrado en el inventario. ¿Desea realizar un reingreso?</p>
                            <button onClick={handleReingreso}>Aceptar</button>
                            <button onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormularioInventario;