import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../../api/usuarios.api';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import * as Yup from 'yup'; // Importar Yup
import './MiPerfil.css';

// Definir esquemas de validación con Yup
const validationSchemas = {
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
  usuario_email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
};

const MiPerfil = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalField, setModalField] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserProfile();
      const userData = response.data;
      // Convertir la fecha de nacimiento al formato YYYY-MM-DD
      if (userData.persona_fecha_nacimiento) {
        userData.persona_fecha_nacimiento = userData.persona_fecha_nacimiento.split('T')[0];
      }
      setUser(userData);
    };
    fetchUserProfile();
  }, []);

  const handleEditClick = (field, title) => {
    setModalField(field);
    setModalTitle(title);
    setModalValue(user[field]);
    setErrors({});
    setShowModal(true);
  };

  const handleSave = async () => {
    let schema = validationSchemas[modalField];
    let valueToValidate = modalField === 'password' ? newPassword : modalValue;

    try {
      await schema.validate(valueToValidate);
      setErrors({});

      if (modalField === 'password') {
        await updateUserPassword(currentPassword, newPassword);
      } else {
        await updateUserProfile({ [modalField]: modalValue });
        const response = await getUserProfile();
        const userData = response.data;
        // Convertir la fecha de nacimiento al formato YYYY-MM-DD
        if (userData.persona_fecha_nacimiento) {
          userData.persona_fecha_nacimiento = userData.persona_fecha_nacimiento.split('T')[0];
        }
        setUser(userData);
      }
      setShowModal(false);
    } catch (error) {
      setErrors({ [modalField]: error.message });
    }
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container-page">
      <h1>Mi Perfil</h1>
      <div className="profile-section">
        <h2>Información Personal</h2>
        <p>Nombre: {user.persona_nombre} <button onClick={() => handleEditClick('persona_nombre', 'Editar Nombre')}><FaEdit /></button></p>
        <p>Apellido: {user.persona_apellido} <button onClick={() => handleEditClick('persona_apellido', 'Editar Apellido')}><FaEdit /></button></p>
        <p>DNI: {user.persona_dni} <button onClick={() => handleEditClick('persona_dni', 'Editar DNI')}><FaEdit /></button></p>
        <p>Fecha de Nacimiento: {user.persona_fecha_nacimiento} <button onClick={() => handleEditClick('persona_fecha_nacimiento', 'Editar Fecha de Nacimiento')}><FaEdit /></button></p>
        <p>Domicilio: {user.persona_domicilio} <button onClick={() => handleEditClick('persona_domicilio', 'Editar Domicilio')}><FaEdit /></button></p>
        <p>Teléfono: {user.persona_telefono} <button onClick={() => handleEditClick('persona_telefono', 'Editar Teléfono')}><FaEdit /></button></p>
      </div>
      <div className="profile-section">
        <h2>Información de la Cuenta</h2>
        <p>Correo: {user.usuario_email} <button onClick={() => handleEditClick('usuario_email', 'Editar Correo')}><FaEdit /></button></p>
        <p>Contraseña: ****** <button onClick={() => handleEditClick('password', 'Cambiar Contraseña')}><FaEdit /></button></p>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalField === 'password' ? (
            <>
              <Form.Group>
                <Form.Label>Contraseña Actual</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </Form.Group>
            </>
          ) : (
            <Form.Group>
              <Form.Label>{modalTitle}</Form.Label>
              <Form.Control
                type={modalField === 'persona_fecha_nacimiento' ? 'date' : 'text'}
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
              />
              {errors[modalField] && <div className="error-message">{errors[modalField]}</div>}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MiPerfil;