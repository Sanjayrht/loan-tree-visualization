import React from 'react';

const InputField = ({ label, name, value, placeholder, handleChange, required }) => {
    return (
        <div className="flex flex-col gap-1 mt-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 capitalize">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                name={name}
                id={name}
                className="px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-[var(--secondary)] transition text-sm"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default InputField;
