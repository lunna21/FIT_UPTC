const { validateNumberDocument, validateEmail, validateTextInput, validatePhoneNumberInput, validateDateInput, validateStudentCode } = require('./inputValidation');

test('validateNumberDocument should return error for invalid input', () => {
    const result1 = validateNumberDocument("");
    console.log('validateNumberDocument(""):', result1);
    expect(result1).toBe("El número de documento es requerido");

    const result2 = validateNumberDocument("123");
    console.log('validateNumberDocument("123"):', result2);
    expect(result2).toBe("El número de documento debe tener entre 8 y 10 dígitos");

    const result3 = validateNumberDocument("12345678901");
    console.log('validateNumberDocument("12345678901"):', result3);
    expect(result3).toBe("El número de documento debe tener entre 8 y 10 dígitos");

    const result4 = validateNumberDocument("123456789");
    console.log('validateNumberDocument("123456789"):', result4);
    expect(result4).toBe(null);
});

test('validateEmail should return error for invalid email', () => {
    const result1 = validateEmail("");
    console.log('validateEmail(""):', result1);
    expect(result1).toBe("El email es requerido");

    const result2 = validateEmail("invalid-email");
    console.log('validateEmail("invalid-email"):', result2);
    expect(result2).toBe("El email no es válido");

    const result3 = validateEmail("anaperez.01@gmail.com");
    console.log('validateEmail("anaperez.01@gmail.com"):', result3);
    expect(result3).toBe(null);
});

test('validateTextInput should validate names and emergency contact name', () => {
    const result1 = validateTextInput("", "Nombre");
    console.log('validateTextInput("", "Nombre"):', result1);
    expect(result1).toBe("Nombre es requerido");

    const result2 = validateTextInput("Ana123", "Nombre");
    console.log('validateTextInput("Ana123", "Nombre"):', result2);
    expect(result2).toBe("Nombre debe contener solo letras");

    const result3 = validateTextInput("Ana", "Nombre");
    console.log('validateTextInput("Ana", "Nombre"):', result3);
    expect(result3).toBe(null);

    const result4 = validateTextInput("", "Apellido");
    console.log('validateTextInput("", "Apellido"):', result4);
    expect(result4).toBe("Apellido es requerido");

    const result5 = validateTextInput("Pérez TEST EToE", "Apellido");
    console.log('validateTextInput("Pérez TEST EToE", "Apellido"):', result5);
    expect(result5).toBe("Apellido debe contener solo letras");

    const result6 = validateTextInput("Pérez", "Apellido");
    console.log('validateTextInput("Pérez", "Apellido"):', result6);
    expect(result6).toBe(null);

    const result7 = validateTextInput("", "Nombre de contacto de emergencia");
    console.log('validateTextInput("", "Nombre de contacto de emergencia"):', result7);
    expect(result7).toBe("Nombre de contacto de emergencia es requerido");

    const result8 = validateTextInput("Ana123", "Nombre de contacto de emergencia");
    console.log('validateTextInput("Ana123", "Nombre de contacto de emergencia"):', result8);
    expect(result8).toBe("Nombre de contacto de emergencia debe contener solo letras");

    const result9 = validateTextInput("Ana", "Nombre de contacto de emergencia");
    console.log('validateTextInput("Ana", "Nombre de contacto de emergencia"):', result9);
    expect(result9).toBe(null);
});

test('validatePhoneNumberInput should return error for invalid phone number', () => {
    const result1 = validatePhoneNumberInput("");
    console.log('validatePhoneNumberInput(""):', result1);
    expect(result1).toBe("El número de teléfono es requerido");

    const result2 = validatePhoneNumberInput("12345");
    console.log('validatePhoneNumberInput("12345"):', result2);
    expect(result2).toBe("El número de teléfono debe tener 10 dígitos");

    const result3 = validatePhoneNumberInput("1234567890");
    console.log('validatePhoneNumberInput("1234567890"):', result3);
    expect(result3).toBe(null);

    const result4 = validatePhoneNumberInput("3106789215");
    console.log('validatePhoneNumberInput("3106789215"):', result4);
    expect(result4).toBe(null);  // Emergency contact number
});

test('validateStudentCode should return error for invalid student code', () => {
    const result1 = validateStudentCode("");
    console.log('validateStudentCode(""):', result1);
    expect(result1).toBe("El código estudiantil es requerido");

    const result2 = validateStudentCode("123");
    console.log('validateStudentCode("123"):', result2);
    expect(result2).toBe("El código estudiantil debe tener entre 6 y 8 dígitos");

    const result3 = validateStudentCode("2023123456");
    console.log('validateStudentCode("2023123456"):', result3);
    expect(result3).toBe(null);
});

test('validateDateInput should return error for invalid birth date', () => {
    const result1 = validateDateInput("");
    console.log('validateDateInput(""):', result1);
    expect(result1).toBe("La fecha de nacimiento es requerida");

    const result2 = validateDateInput("01/01/3000");
    console.log('validateDateInput("01/01/3000"):', result2);
    expect(result2).toBe("La fecha de nacimiento no puede ser en el futuro");

    const result3 = validateDateInput("01/01/2000");
    console.log('validateDateInput("01/01/2000"):', result3);
    expect(result3).toBe(null);
});
