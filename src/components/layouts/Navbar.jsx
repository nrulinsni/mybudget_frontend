import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between lg:justify-start gap-5 bg-base-100 border-b border-base-300 backdrop-blur-sm py-3 px-6 sticky top-0 z-30">
      {/* Tombol menu untuk mobile */}
      <button
        className="btn btn-ghost btn-square block lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <img src="/public/images/logo.png" alt="MyBudget Logo" className="w-12 h-auto" />

      {/* agar hp responsif */}
      {openSideMenu && (
        <div className="fixed top-[60px] left-0 w-[250px] h-full bg-white border-r border-gray-200 shadow-lg z-40 lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;