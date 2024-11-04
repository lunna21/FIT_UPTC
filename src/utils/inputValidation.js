// inputValidation.js

// Function to validate text input (no numbers allowed)
export const validateTextInput = (text) => {
    const regex = /^[a-zA-Z\s]+$/; // Solo permite letras y espacios
    const isValid = regex.test(text);
    return {
        isValid,
        message: isValid ? '' : 'Los datos ingresados no son válidos. Solo se permiten letras y espacios.'
    };
};

// Function to validate number input (only numbers allowed)
export const validateNumberInput = (number) => {
    const regex = /^[0-9]+$/; // Solo permite dígitos
    const isValid = regex.test(number);
    return {
        isValid,
        message: isValid ? '' : 'Los datos ingresados no son válidos. Solo se permiten números.'
    };
};

// Function to validate email input
export const validateEmailInput = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de correo electrónico
    const isValid = regex.test(email);
    return {
        isValid,
        message: isValid ? '' : 'Los datos ingresados no son válidos. Por favor, ingrese un correo electrónico válido.'
    };
};

// Function to validate alphanumeric input (letters and numbers allowed)
export const validateAlphanumericInput = (e) => {
    return /[^a-zA-Z0-9]/;
};

// Function to validate phone number input (only numbers and specific symbols allowed)
export const validatePhoneNumberInput = (e) => {
    return /[^0-9+\-() ]/;
};

// Function to validate date input (only numbers and slashes allowed)
export const validateDateInput = (e) => {
    return /[^0-9/]/;
}
