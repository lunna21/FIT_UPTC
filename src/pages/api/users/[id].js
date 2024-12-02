import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna un usuario específico junto con su historial de estado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 id_status:
 *                   type: integer
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en la búsqueda del usuario
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario específico y todas sus entradas relacionadas en las tablas foráneas.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
export default async function handler(req, res) {
    const { id } = req.query; // 'id'
    const id_user = parseInt(id); // asegurar 'id' es un número entero

    if (req.method === 'GET') {
        try {
            // Realiza la consulta
            const user = await prisma.user.findFirst({
                where: {
                    id_user: id_user, // Usamos el campo único
                },
                include: {
                    history_user_status_history_user_status_id_userTouser: true, // Incluye el historial de estado del usuario
                },
            });

            // Verifica si el usuario fue encontrado
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Agrega el id_status a la información del usuario
            const userWithStatus = {
                ...user,
                id_status: historyStatus
            };

            return res.status(200).json(userWithStatus);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error en la búsqueda del usuario' });
        }
    } else if (req.method === 'DELETE') {
        try {
            // Convierte 'id' a un entero, si es necesario

            const user = await prisma.user.findUnique({
                where: {
                    id_user: id_user,
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
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
                    id_user: id_user,
                },
            });

            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    } else {
        return res.status(405).json({ message: 'Método no permitido' });
    }
}