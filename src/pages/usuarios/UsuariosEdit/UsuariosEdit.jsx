import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuarioRequest, updateUsuarioRequest, getRolesRequest } from '../../../api/usuarios.api';
import FormularioPersona from '../../../components/FormularioPersona/FormularioPersona';
import FormularioUsuario from '../../../components/FormularioUsuario/FormularioUsuario';
import FormularioRol from '../../../components/FormularioRol/FormularioRol';
import * as Yup from 'yup'; // Importar Yup
import './UsuariosEdit.css';
import '../../../assets/styles/buttons.css';

// Definir esquemas de validación con Yup
const validationSchemaStep1 = Yup.object().shape({
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

const validationSchemaStep2 = Yup.object().shape({
  usuario_email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
});

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [persona, setPersona] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [step, setStep] = useState(1); // Estado para controlar el paso actual

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuarioRequest(id);
        const usuarioData = response.data;
        setPersona({
          persona_nombre: usuarioData.persona_nombre,
          persona_apellido: usuarioData.persona_apellido,
          persona_dni: usuarioData.persona_dni,
          persona_telefono: usuarioData.persona_telefono,
          persona_fecha_nacimiento: usuarioData.persona_fecha_nacimiento ? new Date(usuarioData.persona_fecha_nacimiento).toISOString().split('T')[0] : '',
          persona_domicilio: usuarioData.persona_domicilio
        });
        setUsuario({
          usuario_email: usuarioData.usuario_email,
          usuario_pass: '' // No queremos mostrar la contraseña actual
        });
        setSelectedRoles(usuarioData.roles.map(role => role.rol_id)); // Asegurarse de que selectedRoles contenga los IDs de los roles
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsuario();
  }, [id]);

  useEffect(() => {
    async function loadRoles() {
      try {
        const responseRoles = await getRolesRequest();
        setRoles(responseRoles.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    }
    loadRoles();
  }, []);

  const handleNextStep = (values, setErrors, validateForm) => {
    validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        setStep(step + 1);
      } else {
        setErrors(errors);
      }
    });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container-page">
      <h1>Modificar Usuario</h1>
      <Formik
        initialValues={{
          persona_nombre: persona?.persona_nombre || '',
          persona_apellido: persona?.persona_apellido || '',
          persona_dni: persona?.persona_dni || '',
          persona_telefono: persona?.persona_telefono || '',
          persona_fecha_nacimiento: persona?.persona_fecha_nacimiento || '',
          persona_domicilio: persona?.persona_domicilio || '',
          usuario_email: usuario?.usuario_email || '',
          usuario_pass: '',
        }}
        enableReinitialize
        validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2} // Añadir el esquema de validación según el paso
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (step === 1) {
              // Pasar al siguiente paso
              handleNextStep(values, setSubmitting);
            } else {
              const personaData = {
                persona_nombre: values.persona_nombre,
                persona_apellido: values.persona_apellido,
                persona_dni: values.persona_dni,
                persona_telefono: values.persona_telefono,
                persona_fecha_nacimiento: values.persona_fecha_nacimiento,
                persona_domicilio: values.persona_domicilio,
              };
              const usuarioData = {
                usuario_email: values.usuario_email,
                usuario_pass: values.usuario_pass,
              };
              await updateUsuarioRequest(id, { persona: personaData, usuario: usuarioData, roles: selectedRoles });
              navigate('/usuarios');
            }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched, validateForm, setErrors, isSubmitting }) => (
          <Form className="form">
            {step === 1 ? (
              <div>
                <FormularioPersona 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                />
                <button 
                  type="submit" 
                  className="siguiente-button" 
                  onClick={() => handleNextStep(values, setErrors, validateForm)}
                  disabled={isSubmitting}
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div>
                <FormularioUsuario 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue} 
                  values={values} 
                  errors={errors}
                  touched={touched}
                  disablePassword={true}
                  disableEmail={true} // Deshabilitar el campo de correo electrónico
                />
                <FormularioRol roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                <button type="button" className="page-anterior-button" onClick={handlePreviousStep}>
                  Anterior
                </button>
                <button type="submit" className="actualizar-button" disabled={isSubmitting || selectedRoles.length === 0}>
                  Actualizar Usuario
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsuarioEdit;