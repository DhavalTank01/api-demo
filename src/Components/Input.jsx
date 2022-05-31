import React from "react";

const Input = ({
  placeholder,
  type,
  name,
  label,
  value,
  onChange,
  helpText,
  id,
  error,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={id}
        name={name}
      />
      {helpText && <div className="form-text">{helpText}</div>}
      {error && <div className="form-text text-danger">{error}</div>}
    </div>
  );
};

export default Input;
