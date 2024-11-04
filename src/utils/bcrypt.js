import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const saltRounds = 16; // Puedes ajustar esto según tu necesidad de seguridad y rendimiento
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }