
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

export function generateUsername(name, lastName) {
    return `${name.toLowerCase().replace(/ /g, '')}-${lastName.toLowerCase().replace(/ /g, '')}`;
}

export function generatePassword() {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    return generatedPassword;
}