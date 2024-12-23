import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const MainLayout = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="relative flex flex-col h-screen">
      {/* Navbar superior o lateral según la resolución */}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
