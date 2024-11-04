import React, { useState, useEffect } from 'react';
import { MdError } from 'react-icons/md';

const ValidationInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  Icon, 
  name,
  required = false,
  validation,
  max,
  min
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const currentDate = new Date();
  const inputDate = new Date(value);

  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear()-10);

  const minDate = new Date();
  minDate.setFullYear(currentDate.getFullYear() - 90);

  const handleValidation = (value) => {
    if (!touched) return;
    
    if (required && !value) {
      setError('Este campo es obligatorio');
      return;
    }

    if (!value) {
      setError('');
      return;
    }

    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError('Por favor, introduce una dirección de correo electrónico válida');
        } else {
          setError('');
        }
        break;

      case 'number':
        if (!/^\d*$/.test(value)) {
          setError('Por favor, introduce solo números.');
        } else if (max !== undefined && value.length > max) {
          setError(`El número no puede tener más de ${max} dígitos.`);
        } else if (min !== undefined && value.length < min) {
          setError(`El número debe tener al menos ${min} dígitos.`);
        } else {
          setError('');
        }
        break;

      case 'text':
        if (name === 'firstName' || name === 'lastName'||name==='eps'||name==='allergies'||name==='emergencyfullName'||name==='nameMedication'||name==='dosage'||name==='reason') {
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
            setError('Por favor, introduce solo letras.');
          } else if (value.length < 2) {
            setError('El campo debe tener al menos 2 caracteres');
          } else {
            setError('');
          }
        }
        break;

      case 'phoneNumber':
        if (name==='phoneNumber'||name==='contactNumber') {
          if(!/^\d*$/.test(value)){
            setError('Por favor, introduce únicamente números en el número de teléfono.');
          } else if (max !== undefined && value.length > max) {
            setError(`El número de teléfono no puede tener más de ${max} dígitos`);
          } else if (min !== undefined && value.length < min) {
            setError(`El número de teléfono debe tener al menos ${min} dígitos`);
          } else {
            setError('');
          }
        }
        break;

      case 'date':
        if (inputDate > maxDate) {
          setError('La fecha de nacimiento no puede ser menor a 10 años');
        } else if (inputDate < minDate) {
          setError('La fecha de nacimiento no puede ser superior a 90 años');
        } else {
          setError('');
        }
        break;

      default:
        if (validation) {
          const validationError = validation(value);
          setError(validationError || 'Verifica los datos ingresados en el campo');
        }
    }
  };

  useEffect(() => {
    handleValidation(value);
  }, [value, touched]);

  return (
    <div className="register-inputDiv">
      <label htmlFor={name}>
        {label} {required}
      </label>
      <div className={`register-input register-flex ${error ? 'border-red-500' : ''}`}>
        {Icon && <Icon className="register-icon" />}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
            handleValidation(e.target.value);
          }}
          onBlur={() => setTouched(true)}
          className={`w-full outline-none ${error ? 'text-red-500' : ''}`}
          required={required}
          max={type === 'number' ? max : undefined}
          min={type === 'number' ? min : undefined}
        />
        {error && touched && <MdError className="text-red-500 ml-2 text-2xl" />}
      </div>
      {error && touched && (
        <p className="text-accent-red font-bold text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default ValidationInput;