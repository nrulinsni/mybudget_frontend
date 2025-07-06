import React from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex h-screen bg-base-200">
      {/* SideMenu diposisikan di kiri */}
      <div className="max-lg:hidden"> {/* Tetap disembunyikan di layar kecil */}
          <SideMenu activeMenu={activeMenu} />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar akan tetap di atas konten */}
        <Navbar /> 
        {/* Main content dibuat bisa di-scroll */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;