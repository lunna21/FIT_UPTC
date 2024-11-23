
export function calculateAge(date /**format: yyyy/mm/dd */) {
    const today = new Date();
        const birthDate = new Date(date);
        let ageL = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            ageL--;
        }
        return ageL;
}

export function convertToMB(size) {
    return size / 1024 / 1024;
}

export function convertToKB(size) {
    return size / 1024;
}

export function getToday(yearsToSubtract = 0) {
    const today = new Date();
    today.setFullYear(today.getFullYear() - yearsToSubtract);
    return today.toISOString().split('T')[0];
}

export function getValidDate(dateS) {
    let parts;
    if (dateS.includes('-')) {
      parts = dateS.split('-');
    } else if (dateS.includes('/')) {
      parts = dateS.split('/');
    } else {
      throw new Error('Formato de fecha no válido');
    }
  
    const [year, month, day] = parts.map(part => parseInt(part, 10));
  
    // Crear un objeto Date con los valores obtenidos
    const date = new Date(year, month - 1, day);
  
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      throw new Error('Fecha no válida');
    }
  
    return date;
  }

export function generateUsername(name, lastName, role, number) {
  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
  };

  let roleSuffix = '';
  if (role === 'EMP') {
    roleSuffix = '_staff';
  } else if (role === 'ADM') {
    roleSuffix = '_admin';
  }

  const normalizedFirstName = normalizeString(name.toLowerCase());
  const normalizedLastName = normalizeString(lastName.toLowerCase());

  return `${normalizedFirstName}_${normalizedLastName}${roleSuffix}${number}`;
}

/* 
  This function generates a random password with 12 characters
  and at least one uppercase letter, one lowercase letter,
  one number, and one special character.
*/
export function generatePassword() {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let generatedPassword = "";
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  while (
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    generatedPassword = "";
    hasUpperCase = false;
    hasLowerCase = false;
    hasNumber = false;
    hasSpecialChar = false;

    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    const char = charset[randomIndex];
    generatedPassword += char;

    if (/[A-Z]/.test(char)) hasUpperCase = true;
    if (/[a-z]/.test(char)) hasLowerCase = true;
    if (/\d/.test(char)) hasNumber = true;
    if (/[#!@$%&]/.test(char)) hasSpecialChar = true;
    }
  }

  return generatedPassword;
}