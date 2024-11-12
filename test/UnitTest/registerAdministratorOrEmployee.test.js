const { validateNumberDocument, validateEmail, validateTextInput, validatePhoneNumberInput } = require('./inputValidation');

const registerAdministratorOrEmployee = (documentType, documentNumber, fullName, phoneNumber, email) => {
 
    if (validateNumberDocument(documentNumber)) {
        return validateNumberDocument(documentNumber); 
    }
    
 
    const nameValidation = validateTextInput(fullName, 'Nombre Completo');
    if (nameValidation) return nameValidation; 

    const phoneValidation = validatePhoneNumberInput(phoneNumber);
    if (phoneValidation) return phoneValidation; 

    const emailValidation = validateEmail(email);
    if (emailValidation) return emailValidation; 

    
    return "Registro exitoso";
};

test('Registro de Administrador/Empleado', () => {
    // Datos de prueba válidos
    const documentType = 'Cédula de Ciudadanía'; 
    const documentNumber = "123456789"; 
    const fullName = "Ana Pérez"; 
    const phoneNumber = "3106789215"; 
    const email = "ana.perez@gmail.com"; 


    const result = registerAdministratorOrEmployee(documentType, documentNumber, fullName, phoneNumber, email);
    console.log('Registro de Administrador/Empleado con datos válidos:', result);
    expect(result).toBe("Registro exitoso"); 

   
    const invalidDocumentNumber = "123"; 
    const invalidEmail = "invalid-email"; 
    const invalidPhoneNumber = "12345"; 

 
    const resultDoc = registerAdministratorOrEmployee(documentType, invalidDocumentNumber, fullName, phoneNumber, email);
    console.log('Validación de documento inválido:', resultDoc);
    expect(resultDoc).toBe("El número de documento debe tener entre 8 y 10 dígitos"); 

   
    const resultEmail = registerAdministratorOrEmployee(documentType, documentNumber, fullName, phoneNumber, invalidEmail);
    console.log('Validación de correo electrónico inválido:', resultEmail);
    expect(resultEmail).toBe("El email no es válido"); 

    
    const resultPhone = registerAdministratorOrEmployee(documentType, documentNumber, fullName, invalidPhoneNumber, email);
    console.log('Validación de número de teléfono inválido:', resultPhone);
    expect(resultPhone).toBe("El número de teléfono debe tener 10 dígitos"); 
});
