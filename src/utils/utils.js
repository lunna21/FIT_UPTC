
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
  const now = new Date();

  // Convertir la fecha actual al huso horario UTC-5
  const utcOffset = 5 * 60 * 60 * 1000; // 5 horas en milisegundos
  const adjustedTime = new Date(now.getTime() - utcOffset);

  // Ajustar el año si es necesario
  adjustedTime.setFullYear(adjustedTime.getFullYear() - yearsToSubtract);

  // Formatear la fecha al formato YYYY-MM-DD
  return adjustedTime.toISOString().split('T')[0];
}

export function getValidDate(dateS) {
  let parts;
  if (dateS) {
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
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*><";
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

    // Ensure the password length is 12
    if (generatedPassword.length !== length) {
      generatedPassword = "";
      hasUpperCase = false;
      hasLowerCase = false;
      hasNumber = false;
      hasSpecialChar = false;
    }
  }

  return generatedPassword;
}

export function toCapitalize(string) {
  if (typeof string !== 'string') {
    console.error('Input must be a string');
    return
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Function to check if a date is in the format yyyy-mm-dd
export function checkFormatDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

// entra con un string en formato HH:MM:SS y retorna un string en formato HH:MM AM/PM
export const getFormatHour = (hour) => {
  if (!hour) {
    return hour;
  }
  const [h, m] = hour.split(":");
  const amPm = h >= 12 ? "PM" : "AM";
  const newHour = h > 12 ? h - 12 : h;
  return `${newHour}:${m} ${amPm}`;
};

// recibe date en string formato yyyy-mm-dd y retorna el día de la semana
export const getDayOfWeek = (date) => {
  const days = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

  // Convertir manualmente la fecha al formato local
  if(!date.includes("-")) {
    return date;
  }
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day); // Crear la fecha localmente

  return days[dateObj.getDay()];
};

export const getTime = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0'); // Horas locales
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos locales
  const seconds = String(now.getSeconds()).padStart(2, '0'); // Segundos locales

  return `${hours}:${minutes}:${seconds}`;
};

// retorna true si maxTime es mayor a minTime
export const comparateTimes = (maxTime, minTime) => {
  const max = getTime(maxTime);
  const min = getTime(minTime);

  return max > min;
}