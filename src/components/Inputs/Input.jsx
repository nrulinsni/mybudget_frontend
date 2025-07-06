import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          // Menggunakan kelas DaisyUI + Tailwind untuk fokus kuning
          className="input input-bordered w-full pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Menggunakan warna tema primer (biru)
              <FaRegEye size={18} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={18} className="text-base-content/40" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;