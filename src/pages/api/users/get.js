import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @swagger
 * /api/users/get:
 *   get:
 *     summary: Retrieve a list of users or a specific user by username
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: false
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: A list of users or a specific user with status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: integer
 *                     description: The user ID
 *                   name_user:
 *                     type: string
 *                     description: The username
 *                   person_user_id_personToperson:
 *                     type: object
 *                     description: The related person object
 *                   id_status:
 *                     type: integer
 *                     description: The latest status ID of the user
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error retrieving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener usuarios
 */
export default async function gethandler(req, res) {
    try {
        const users = await prisma.user.findMany();
        const { username } = req.query;

        if (username) {
            const user = await prisma.user.findUnique({
                where: { name_user: username },
                include: {
                    person_user_id_personToperson: true,
                }
            });
            if (user) {
                const historyStatus = await prisma.history_user_status.findMany({
                    where: { id_user: user.id_user },
                    orderBy: { date_hour_userstatus: 'desc' },
                    take: 1
                });

                const userWithStatus = {
                    ...user,
                    id_status: historyStatus.length > 0 ? historyStatus[0].id_user_status : null
                };

                return res.status(200).json(userWithStatus);
            } else {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}