import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query; // 'id' debería ser el número de documento en este caso
    if (req.method === 'GET') {
        try {
            // Convierte 'id' a un entero, si es necesario
            const documentNumber = parseInt(id); // Asegúrate de que 'id' es un número entero

            // Realiza la consulta
            const user = await prisma.user.findFirst({
                where: {
                    document_number_person: documentNumber, // Usamos el campo único
                },
            });

            // Verifica si el usuario fue encontrado
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error en la búsqueda del usuario' });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}