import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendedoresList from './pages/vendedores/VendedoresList/VendedoresList';
import NotFound from './pages/NotFound';
import VendedorCreate from './pages/vendedores/VendedorCreate/VendedorCreate';
import VendedorDetail from './pages/vendedores/VendedorDetail/VendedorDetail';
import VendedoresInactivosList from './pages/vendedores/VendedoresInactivosList/VendedoresInactivosList';
import VendedorEdit from './pages/vendedores/VendedorEdit/VendedorEdit';
import Login from './pages/login/Login/Login';
import SeleccionRol from './pages/login/SeleccionRol/SeleccionRol';
import UsuariosList from './pages/usuarios/UsuariosList/UsuariosList';
import UsuariosInactivosList from "./pages/usuarios/UsuariosInactivosList/UsuariosInactivosList";
import UsuariosCreate from './pages/usuarios/UsuariosCreate/UsuariosCreate';
import UsuarioEdit from './pages/usuarios/UsuariosEdit/UsuariosEdit';
import ProtectedRoute from './pages/ProtectedRoute';

import Inventario from './pages/inventario/Inventario/Inventario';
import MarcasProductos from './pages/inventario/MarcasProductos/MarcasProductos';
import Productos from './pages/inventario/Productos/Productos';
import TiposProductos from './pages/inventario/TiposProductos/TiposProductos';

import ClientesList from './pages/clientes/ClientesList/ClientesList';
import ClientesCreate from './pages/clientes/ClientesCreate/ClientesCreate';
import ClientesEdit from './pages/clientes/ClientesEdit/ClientesEdit';
import ClientesInactivosList from './pages/clientes/ClientesInactivosList/ClientesInactivosList';

import VentasHome from './pages/ventas/VentasHome/VentasHome';
import VentasList from './pages/ventas/VentasList/VentasList';
import RegistrarVenta from './pages/ventas/RegistrarVenta/RegistrarVenta';

import MiPerfil from './pages/MiPerfil/MiPerfil';
import RequestPasswordReset from './pages/RequestPasswordReset/RequestPasswordReset';
import ResetPassword from './pages/ResetPassword/ResetPassword';

import MainLayout from './components/layouts/MainLayout/MainLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/variables.css';
import './assets/styles/pages.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Routes>
        {/* Redirigir la ruta raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Página de solicitud de recuperación de contraseña */}
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />

        {/* Página de restablecimiento de contraseña */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Página de selección de roles, protegida */}
        <Route
          path="/seleccion-rol"
          element={
            <ProtectedRoute>
              <SeleccionRol />
            </ProtectedRoute>
          }
        />

        {/* Módulo de vendedores */}
        <Route
          path="/vendedores"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VendedoresList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-vendedor"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VendedorCreate />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendedor/:id"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VendedorDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendedores/inactivos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VendedoresInactivosList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendedor/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VendedorEdit />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Módulo de usuarios */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <UsuariosList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/inactivos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <UsuariosInactivosList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/alta"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <UsuariosCreate />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios/editar/:id"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <UsuarioEdit />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Módulo de inventario */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <Inventario />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/marcas-productos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <MarcasProductos />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <Productos />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tipos-productos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <TiposProductos />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Módulo de clientes */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <ClientesList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes/alta"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <ClientesCreate />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes/editar/:id"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <ClientesEdit />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes/inactivos"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <ClientesInactivosList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Módulo de ventas */}
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VentasHome />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ventas/listado"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VentasList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ventas/registrar"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <RegistrarVenta />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/registrar-venta"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <RegistrarVenta />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-ventas"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <VentasList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Ruta para "Mi Perfil" */}
        <Route
          path="/mi-perfil"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <MiPerfil />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
                <NotFound />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;