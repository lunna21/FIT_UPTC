// validations.js

/**
 * Constantes de validación
 */
export const VALIDATION_CONSTANTS = {
    MIN_AGE: 10,
    MAX_AGE: 80,
    PHONE_LENGTH: 10,
    MIN_PASSWORD_LENGTH: 8,
    DOCUMENT_TYPES: ['CC', 'TI', 'CE'],
    BLOOD_TYPES: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    USER_ROLES: ['ADM', 'EMP', 'STU'],
    USER_STATUSES: ['ACT', 'INA', 'LOC', 'PEN', 'SUS'],
    MAX_NAME_LENGTH: 50,
    RELATIONSHIP_TYPES: [
        'PADRE', 'MADRE', 'HERMANO', 'HERMANA', 'ESPOSO', 'ESPOSA',
        'HIJO', 'HIJA', 'ABUELO', 'ABUELA', 'TIO', 'TIA', 'PRIMO',
        'PRIMA', 'TUTOR', 'AMIGO', 'COLEGA', 'VECINO', 'OTRO'
    ],
    STATEMENT_TYPES: ['PREGR', 'FESAD', 'POSTG'],
    STUDENT_CODE_MIN_LENGTH: 8,
    STUDENT_CODE_MAX_LENGTH: 10,
    URL_MAX_LENGTH: 500,
    URL_ALLOWED_EXTENSIONS: ['.pdf'],
    MAX_ALLERGIES_DESCRIPTION: 100,
    MAX_MEDICATION_NAME: 100,
    MAX_MEDICATION_DOSE: 50,
    MAX_REASON_LENGTH: 255
};

/**
 * Validación de correo electrónico
 */
export function validateEmail(email) {
    const errors = [];
    
    if (!email) {
        errors.push('El correo electrónico es requerido');
        return errors;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailRegex.test(email)) {
        errors.push('El formato del correo electrónico no es válido');
    }

    if (email.length > 100) {
        errors.push('El correo electrónico no puede tener más de 100 caracteres');
    }

    return errors;
}

/**
 * Validación de fecha de nacimiento
 */
export function validateBirthdate(birthdateS) {
    const errors = [];

    if (!birthdateS) {
        errors.push('La fecha de nacimiento es requerida');
        return errors;
    }

    const birthDate = new Date(birthdateS);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < VALIDATION_CONSTANTS.MIN_AGE) {
        errors.push(`La edad mínima permitida es ${VALIDATION_CONSTANTS.MIN_AGE} años`);
    }

    if (age > VALIDATION_CONSTANTS.MAX_AGE) {
        errors.push(`La edad máxima permitida es ${VALIDATION_CONSTANTS.MAX_AGE} años`);
    }

    if (birthDate > today) {
        errors.push('La fecha de nacimiento no puede ser futura');
    }

    return errors;
}

/**
 * Validación de número de teléfono
 */
export function validatePhoneNumber(phone) {
    const errors = [];

    if (!phone) {
        errors.push('El número de teléfono es requerido');
        return errors;
    }

    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(phone)) {
        errors.push('El número de teléfono debe contener exactamente 10 dígitos numéricos');
    }

    return errors;
}

/**
 * Validación de tipo de documento
 */
export function validateDocumentType(documentType) {
    const errors = [];

    if (!documentType) {
        errors.push('El tipo de documento es requerido');
        return errors;
    }

    if (!VALIDATION_CONSTANTS.DOCUMENT_TYPES.includes(documentType)) {
        errors.push('El tipo de documento no es válido');
    }

    return errors;
}

/**
 * Validación de número de documento
 */
export function validateDocumentNumber(documentNumber) {
    const errors = [];

    if (!documentNumber) {
        errors.push('El número de documento es requerido');
        return errors;
    }

    if (!/^\d+$/.test(documentNumber)) {
        errors.push('El número de documento debe contener solo dígitos');
    }

    if (documentNumber.length < 5 || documentNumber.length > 20) {
        errors.push('El número de documento debe tener entre 5 y 20 dígitos');
    }

    return errors;
}

/**
 * Validación de tipo de sangre
 */
export function validateBloodType(bloodType) {
    const errors = [];

    if (!bloodType) {
        errors.push('El tipo de sangre es requerido');
        return errors;
    }

    if (!VALIDATION_CONSTANTS.BLOOD_TYPES.includes(bloodType)) {
        errors.push('El tipo de sangre no es válido');
    }

    return errors;
}

/**
 * Validación de contraseña
 */
export function validatePassword(password, firstName, lastName) {
    const errors = [];

    if (!password) {
        errors.push('La contraseña es requerida');
        return errors;
    }

    if (password.length < VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH) {
        errors.push(`La contraseña debe tener al menos ${VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH} caracteres`);
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }

    if (!/[!@#$%^&*]/.test(password)) {
        errors.push('La contraseña debe contener al menos un carácter especial (#, !, @, $, %, &)');
    }

    if ((firstName && lastName) && (password.toLowerCase().includes(firstName.toLowerCase() || password.toLowerCase().includes(lastName)) )) {
        errors.push('La contraseña no debe contener información personal como el nombre o apellido');
    }

    return errors;
}

/**
 * Validación de nombre de usuario
 */
export function validateUsername(username) {
    const errors = [];

    if (!username) {
        errors.push('El nombre de usuario es requerido');
        return errors;
    }

    if (username.length < 4) {
        errors.push('El nombre de usuario debe tener al menos 4 caracteres');
    }

    if (username.length > VALIDATION_CONSTANTS.MAX_NAME_LENGTH) {
        errors.push(`El nombre de usuario no puede tener más de ${VALIDATION_CONSTANTS.MAX_NAME_LENGTH} caracteres`);
    }

    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        errors.push('El nombre de usuario solo puede contener letras, números, puntos y guiones bajos');
    }

    return errors;
}

/**
 * Validación de rol de usuario
 */
export function validateUserRole(role) {
    const errors = [];

    if (!role) {
        errors.push('El rol de usuario es requerido');
        return errors;
    }

    if (!VALIDATION_CONSTANTS.USER_ROLES.includes(role)) {
        errors.push('El rol de usuario no es válido');
    }

    return errors;
}

/**
 * Validación de nombres y apellidos
 */
export function validatePersonName(name, fieldName = 'nombre') {
    const errors = [];

    if (!name) {
        errors.push(`El ${fieldName} es requerido`);
        return errors;
    }

    if (name.length > VALIDATION_CONSTANTS.MAX_NAME_LENGTH) {
        errors.push(`El ${fieldName} no puede tener más de ${VALIDATION_CONSTANTS.MAX_NAME_LENGTH} caracteres`);
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        errors.push(`El ${fieldName} solo puede contener letras y espacios`);
    }

    return errors;
}

/**
 * Validación de contacto de emergencia
 */
export function validateEmergencyContact(contact) {
    const errors = [];

    if (!contact) {
        errors.push('La información del contacto de emergencia es requerida');
        return errors;
    }

    errors.push(...validatePersonName(contact.full_name_emecont, 'nombre del contacto'));
    errors.push(...validatePhoneNumber(contact.phone_number_emecont));

    if (!contact.relationship_emecont) {
        errors.push('El parentesco es requerido');
    } else if (!VALIDATION_CONSTANTS.RELATIONSHIP_TYPES.includes(contact.relationship_emecont)) {
        errors.push('El tipo de parentesco no es válido');
    }

    return errors;
}

/**
 * Validación completa de persona
 */
export function validatePerson(person) {
    let errors = {};

    errors.document_type = validateDocumentType(person.id_document_type);
    errors.document_number = validateDocumentNumber(person.document_number_person);
    errors.first_name = validatePersonName(person.first_name_person, 'nombre');
    errors.last_name = validatePersonName(person.last_name_person, 'apellido');
    errors.phone = validatePhoneNumber(person.phone_number_person);
    errors.email = validateEmail(person.email_person);
    errors.birthdate = validateBirthdate(person.birthdate_person);

    Object.keys(errors).forEach(key => {
        if (errors[key].length === 0) {
            delete errors[key];
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validación completa de usuario
 */
export function validateUser(user) {
    let errors = {};

    // errors.username = validateUsername(user.name_user);
    errors.password = validatePassword(user.password_user);
    errors.role = validateUserRole(user.id_role_user);
    
    if (user.document_number_person) {
        errors.document_number = validateDocumentNumber(user.document_number_person);
    }

    Object.keys(errors).forEach(key => {
        if (errors[key].length === 0) {
            delete errors[key];
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validación de código de estudiante
 */
export function validateStudentCode(studentCode) {
    const errors = [];

    if (!studentCode) {
        errors.push('El código de estudiante es requerido');
        return errors;
    }
    if (studentCode.length < VALIDATION_CONSTANTS.STUDENT_CODE_MIN_LENGTH || studentCode.length > VALIDATION_CONSTANTS.STUDENT_CODE_MAX_LENGTH) {
        errors.push(`El código de estudiante debe tener entre ${VALIDATION_CONSTANTS.STUDENT_CODE_MIN_LENGTH} y ${VALIDATION_CONSTANTS.STUDENT_CODE_MAX_LENGTH} caracteres`);
    }

    if (!/^\d+$/.test(studentCode)) {
        errors.push('El código de estudiante solo puede contener dígitos');
    }

    return errors;
}

/**
 * Validación de tipo de estudio
 */
export function validateStatementType(statementType) {
    const errors = [];

    if (!statementType) {
        errors.push('El tipo de estudio es requerido');
        return errors;
    }

    if (!VALIDATION_CONSTANTS.STATEMENT_TYPES.includes(statementType)) {
        errors.push('El tipo de estudio no es válido');
    }

    return errors;
}

/**
 * Validación de URL del consentimiento
 */
export function validateConsentUrl(url) {
    const errors = [];

    if (!url) {
        errors.push('La URL del consentimiento es requerida');
        return errors;
    }

    if (url.length > VALIDATION_CONSTANTS.URL_MAX_LENGTH) {
        errors.push(`La URL no puede exceder ${VALIDATION_CONSTANTS.URL_MAX_LENGTH} caracteres`);
    }

    const hasValidExtension = VALIDATION_CONSTANTS.URL_ALLOWED_EXTENSIONS.some(ext => 
        url.toLowerCase().endsWith(ext)
    );

    if (!hasValidExtension) {
        errors.push('El archivo debe ser PDF');
    }

    return errors;
}

/**
 * Validación de alergias
 */
export function validateAllergy(allergy) {
    const errors = [];

    if (!allergy) {
        return errors;
    }

    if (allergy.name_allergy && allergy.name_allergy.length > VALIDATION_CONSTANTS.MAX_ALLERGIES_DESCRIPTION) {
        errors.push(`La descripción de la alergia no puede exceder ${VALIDATION_CONSTANTS.MAX_ALLERGIES_DESCRIPTION} caracteres`);
    }

    return errors;
}

/**
 * Validación de medicamentos
 */
export function validateMedication(medication) {
    const errors = [];

    if (!medication) {
        return errors;
    }

    if (!medication.name_presmed) {
        errors.push('El nombre del medicamento es requerido');
    } else if (medication.name_presmed.length > VALIDATION_CONSTANTS.MAX_MEDICATION_NAME) {
        errors.push(`El nombre del medicamento no puede exceder ${VALIDATION_CONSTANTS.MAX_MEDICATION_NAME} caracteres`);
    }

    if (!medication.dose_persmed) {
        errors.push('La dosis del medicamento es requerida');
    } else if (medication.dose_persmed.length > VALIDATION_CONSTANTS.MAX_MEDICATION_DOSE) {
        errors.push(`La dosis no puede exceder ${VALIDATION_CONSTANTS.MAX_MEDICATION_DOSE} caracteres`);
    }

    if (!medication.recipe_reason) {
        errors.push('La razón de la prescripción es requerida');
    } else if (medication.recipe_reason.length > VALIDATION_CONSTANTS.MAX_REASON_LENGTH) {
        errors.push(`La razón no puede exceder ${VALIDATION_CONSTANTS.MAX_REASON_LENGTH} caracteres`);
    }

    return errors;
}

/**
 * Validación completa de detalles de inscripción
 */
export function validateInscriptionDetail(inscriptionDetail) {
    let errors = {};

    errors.statement_type = validateStatementType(inscriptionDetail.id_estatment_u);
    errors.student_code = validateStudentCode(inscriptionDetail.student_code, inscriptionDetail.id_estatment_u);
    errors.blood_type = validateBloodType(inscriptionDetail.blood_type);
    errors.consent_url = validateConsentUrl(inscriptionDetail.url_consent);
    errors.emergency_contact = validateEmergencyContact(inscriptionDetail.emergency_contact);

    if (inscriptionDetail.allergy) {
        errors.allergy = validateAllergy(inscriptionDetail.allergy);
    }

    if (inscriptionDetail.medications && inscriptionDetail.medications.length > 0) {
        errors.medications = inscriptionDetail.medications.map(med => validateMedication(med))
            .filter(errors => errors.length > 0);
    }

    Object.keys(errors).forEach(key => {
        if (Array.isArray(errors[key]) && errors[key].length === 0) {
            delete errors[key];
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}