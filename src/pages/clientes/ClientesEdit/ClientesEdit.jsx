import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteRequest, updateClienteRequest } from '../../../api/clientes.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import * as Yup from 'yup'; // Importar Yup
import './ClientesEdit.css';
import '../../../assets/styles/buttons.css';

// Definir el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  persona_nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  persona_apellido: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  persona_dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^\d+$/, 'El DNI debe contener solo números')
    .min(7, 'El DNI debe tener al menos 7 caracteres')
    .max(8, 'El DNI no puede tener más de 8 caracteres'),
  persona_telefono: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d+$/, 'El teléfono debe contener solo números')
    .min(10, 'El teléfono debe tener al menos 10 caracteres')
    .max(15, 'El teléfono no puede tener más de 15 caracteres'),
  persona_fecha_nacimiento: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
  persona_domicilio: Yup.string()
    .required('El domicilio es obligatorio')
    .min(5, 'El domicilio debe tener al menos 5 caracteres'),
});

const ClientesEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await getClienteRequest(id);
        const clienteData = response.data;

        // Convertir la fecha al formato YYYY-MM-DD
        const fechaNacimiento = clienteData.persona_fecha_nacimiento
          ? new Date(clienteData.persona_fecha_nacimiento).toISOString().split('T')[0]
          : '';

        setCliente({
          ...clienteData,
          persona_fecha_nacimiento: fechaNacimiento, // Formato YYYY-MM-DD
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCliente();
  }, [id]);

  if (!cliente) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-page">
      <h1 className="title">Editar Cliente</h1>
      <h2>Modifique los campos necesarios para actualizar la información del cliente.</h2>
      <Formik
        initialValues={cliente}
        validationSchema={validationSchema} // Añadir el esquema de validación
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Filtrar solo los datos de la persona
            const personaData = {
              persona_nombre: values.persona_nombre,
              persona_apellido: values.persona_apellido,
              persona_dni: values.persona_dni,
              persona_telefono: values.persona_telefono,
              persona_fecha_nacimiento: values.persona_fecha_nacimiento,
              persona_domicilio: values.persona_domicilio,
            };

            console.log('Datos enviados para actualizar la persona:', personaData);

            await updateClienteRequest(id, personaData);
            navigate('/clientes'); // Redirigir a la URL "/clientes" después de finalizar la actualización
          } catch (error) {
            console.log('Error actualizando cliente:', error);
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="form">
            <FormularioPersona 
              handleChange={handleChange} 
              setFieldValue={setFieldValue} 
              values={values} 
              errors={errors} 
              touched={touched} 
            />
            <button type="submit" className="alta-button" disabled={isSubmitting}>
              Actualizar Cliente
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ClientesEdit;