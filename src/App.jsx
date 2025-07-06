import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Settings from "./pages/Profile/Settings";
import './index.css';
import { UserProvider } from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      {/* <Router> dihapus dari sini */}
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/profile" element={<Settings />} />
      </Routes>
      {/* <Router> dihapus dari sini */}
      
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};