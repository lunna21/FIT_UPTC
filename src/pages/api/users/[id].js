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
    } else if (req.method === 'DELETE') {
        try {
            // Convierte 'id' a un entero, si es necesario
            const id_user = parseInt(id); // Asegúrate de que 'id' es un número entero

            // Encuentra el usuario por el número de documento
            const user = await prisma.user.findUnique({
                where: {
                    id_user: id_user,
                }
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Elimina las entradas relacionadas en las tablas foráneas
            await prisma.history_user_status.deleteMany({
                where: {
                    id_user: user.id_user,
                },
            });

            await prisma.inscription_detail_audit.deleteMany({
                where: {
                    insdetail_id: user.id_user,
                },
            });

            await prisma.user_audit.deleteMany({
                where: {
                    OR: [
                        { id_user: user.id_user },
                        { change_useraudit_by: user.id_user },
                    ],
                },
            });

            // Elimina el usuario
            await prisma.user.delete({
                where: {
                    document_number_person: documentNumber,
                },
            });

            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}