import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <-- Baris ini menyambungkan semua CSS ke aplikasi Anda
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster position="top-right" />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);