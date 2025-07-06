import React, { createContext, useState } from 'react';

// 1. Membuat Context
export const UserContext = createContext(null);

// 2. Membuat Komponen Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fungsi untuk memperbarui data user saat login
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Fungsi untuk membersihkan data user saat logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Nilai yang akan disediakan ke seluruh aplikasi
  const value = { user, updateUser, clearUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};