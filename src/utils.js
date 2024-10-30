
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

export function getToday() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}