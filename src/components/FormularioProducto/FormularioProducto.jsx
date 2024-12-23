import React, { useState, useEffect } from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import './FormularioProducto.css';
import { tiposProductosList, marcasList } from '../../api/inventario.api';

const FormularioProducto = ({ handleSubmit, onClose, setFieldValue, isEditing }) => {
    const [tiposProductos, setTiposProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const fetchTiposProductos = async () => {
            const data = await tiposProductosList();
            setTiposProductos(data);
        };

        const fetchMarcas = async () => {
            const data = await marcasList();
            setMarcas(data);
        };

        fetchTiposProductos();
        fetchMarcas();
    }, []);

    return (
        <div className="modal-producto">
            <div className="modal-content-producto">
                <span className="close-producto" onClick={onClose}>&times;</span>
                <h2>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                <Form className="form-producto" onSubmit={handleSubmit}>
                    <label htmlFor="codigoBarrasProducto" className="label-producto">Código de Barras:</label>
                    <Field type="text" id="codigoBarrasProducto" name="codigoBarrasProducto" className="input-producto" />
                    <ErrorMessage name="codigoBarrasProducto" component="div" className="error-producto" />

                    <label htmlFor="nombreProducto" className="label-producto">Nombre del Producto:</label>
                    <Field type="text" id="nombreProducto" name="nombreProducto" className="input-producto" />
                    <ErrorMessage name="nombreProducto" component="div" className="error-producto" />

                    <label htmlFor="idTipoProducto" className="label-producto">Tipo de Producto:</label>
                    <Field as="select" id="idTipoProducto" name="idTipoProducto" className="input-producto">
                        <option value="">Seleccione un tipo de producto</option>
                        {tiposProductos.map(tipo => (
                            <option key={tipo.idTipoProducto} value={tipo.idTipoProducto}>{tipo.nombreTipoProducto}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="idTipoProducto" component="div" className="error-producto" />

                    <label htmlFor="idMarcaProducto" className="label-producto">Marca del Producto:</label>
                    <Field as="select" id="idMarcaProducto" name="idMarcaProducto" className="input-producto">
                        <option value="">Seleccione una marca</option>
                        {marcas.map(marca => (
                            <option key={marca.idMarcaProducto} value={marca.idMarcaProducto}>{marca.nombreMarcaProducto}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="idMarcaProducto" component="div" className="error-producto" />

                    <button type="submit" className="button-producto">{isEditing ? 'Editar' : 'Agregar'}</button>
                </Form>
            </div>
        </div>
    );
};

export default FormularioProducto;