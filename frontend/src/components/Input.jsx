import React from "react";

const Input = ({ placeholder, value, name, id, type, onChange }) => {
  return (
    <div className="relative my-4">
      <input
        className="w-full h-12 p-4 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
        id={id}
        type={type}
        placeholder=" " // Placeholder'ı boş bırakıyoruz
        value={value}
        name={name}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-3 transition-all duration-200 ease-in-out ${
          value ? "text-blue-400 text-xs transform -translate-y-4" : "text-gray-500"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
