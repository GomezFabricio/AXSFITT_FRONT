import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './FormularioTiposProductos.css';

const FormularioTiposProductos = ({ handleSubmit, onClose, isEditing }) => {
    return (
        <div className="modal-tipo-producto">
            <div className="modal-content-tipo-producto">
                <span className="close-tipo-producto" onClick={onClose}>&times;</span>
                <h2>{isEditing ? 'Editar Tipo de Producto' : 'Agregar Nuevo Tipo de Producto'}</h2>
                <form onSubmit={handleSubmit} className="form-tipo-producto">
                    <label htmlFor="nombreTipoProducto" className="label-tipo-producto">Nombre del Tipo de Producto:</label>
                    <Field type="text" id="nombreTipoProducto" name="nombreTipoProducto" className="input-tipo-producto" />
                    <ErrorMessage name="nombreTipoProducto" component="div" className="error-tipo-producto" />
                    <button type="submit" className="button-tipo-producto">{isEditing ? 'Editar' : 'Agregar'}</button>
                </form>
            </div>
        </div>
    );
};

export default FormularioTiposProductos;