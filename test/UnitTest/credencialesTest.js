function generateUniqueUsername(firstName, lastName, existingUsernames) {
    const username = `${firstName}.${lastName}`.toLowerCase();
    return existingUsernames.includes(username) ? null : username;
}

function isPasswordSecure(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Pruebas unitarias con Jest
describe('RQF13: Asignar Credenciales de Usuario', () => {

    test('CP-RQF13-01: Asignación de nombre de usuario único', () => {
        const existingUsernames = ['juan.perez', 'maria.gomez'];
        const firstName = 'Carlos';
        const lastName = 'Ramirez';
        const username = generateUniqueUsername(firstName, lastName, existingUsernames);

        expect(username).toBe('carlos.ramirez');
    });

    test('CP-RQF13-02: Contraseña cumple con requisitos de seguridad', () => {
        const securePassword = 'Secure#123';
        const result = isPasswordSecure(securePassword);

        expect(result).toBe(true);
    });

    test('CP-RQF13-03: Contraseña inválida (no cumple con requisitos)', () => {
        const invalidPassword = 'short';
        const result = isPasswordSecure(invalidPassword);

        expect(result).toBe(false);
    });

    test('CP-RQF13-04: Contraseñas no coinciden', () => {
        const password = 'Secure#123';
        const confirmPassword = 'Secure#124';
        const result = passwordsMatch(password, confirmPassword);

        expect(result).toBe(false);
    });

});
