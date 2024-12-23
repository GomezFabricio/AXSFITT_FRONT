import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './FormularioMarcas.css';

const FormularioMarcas = ({ handleSubmit, onClose, isEditing }) => {
    return (
        <div className="modal-marca">
            <div className="modal-content-marca">
                <span className="close-marca" onClick={onClose}>&times;</span>
                <h2>{isEditing ? 'Editar Marca' : 'Agregar Nueva Marca'}</h2>
                <form onSubmit={handleSubmit} className="form-marca">
                    <label htmlFor="nombreMarcaProducto" className="label-marca">Nombre de la Marca:</label>
                    <Field type="text" id="nombreMarcaProducto" name="nombreMarcaProducto" className="input-marca" />
                    <ErrorMessage name="nombreMarcaProducto" component="div" className="error-marca" />
                    <button type="submit" className="button-marca">{isEditing ? 'Editar' : 'Agregar'}</button>
                </form>
            </div>
        </div>
    );
};

export default FormularioMarcas;