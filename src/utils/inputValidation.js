// inputValidation.js

// Function to validate text input (no numbers allowed)
export const validateTextInput = (e) => {
    const value = e.target.value;
    return /[0-9]/;
};

// Function to validate number input (only numbers allowed)
export const validateNumberInput = (e) => {
    return /[^0-9]/;
};

// Function to validate email input
export const validateEmailInput = (e) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
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
