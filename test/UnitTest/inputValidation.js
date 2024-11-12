const validateNumberDocument = (numberDocument) => {
    if (!numberDocument) return "El número de documento es requerido";
    if (!/^\d{8,10}$/.test(numberDocument)) return "El número de documento debe tener entre 8 y 10 dígitos";
    return null;
};

const validateTextInput = (input, fieldName) => {
    if (!input) return `${fieldName} es requerido`;
    const regex = /^(?:[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*)$/;
    if (!regex.test(input)) return `${fieldName} debe contener solo letras`;
    return null;
};

const validateStudentCode = (studentCode) => {
    if (!studentCode) return "El código estudiantil es requerido";
    if (!/^\d{9,10}$/.test(studentCode)) return "El código estudiantil debe tener entre 6 y 8 dígitos";
    return null;
};

const validatePhoneNumberInput = (phoneNumber) => {
    if (!phoneNumber) return "El número de teléfono es requerido";
    if (!/^\d{10}$/.test(phoneNumber)) return "El número de teléfono debe tener 10 dígitos";
    return null;
};

const validateEmail = (email) => {
    if (!email) return "El email es requerido";
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return "El email no es válido";
    return null;
};

const validateDateInput = (date) => {
    if (!date) return "La fecha de nacimiento es requerida";
    if (new Date(date) > new Date()) return "La fecha de nacimiento no puede ser en el futuro";
    return null;
};

module.exports = { 
    validateNumberDocument,
    validateTextInput,
    validateStudentCode,
    validatePhoneNumberInput,
    validateEmail,
    validateDateInput
};