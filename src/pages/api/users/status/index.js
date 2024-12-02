import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users/status:
 *   put:
 *     summary: Cambia el estado de un usuario
 *     description: Cambia el estado de un usuario dado su ID, razón, ID del modificador y el nuevo estado.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID del usuario cuyo estado se va a cambiar
 *                 example: "123"
 *               reason:
 *                 type: string
 *                 description: Razón del cambio de estado
 *                 example: "Actualización de estado"
 *               idModifier:
 *                 type: string
 *                 description: ID del usuario que realiza el cambio
 *                 example: "456"
 *               status:
 *                 type: string
 *                 description: Nuevo estado del usuario
 *                 enum: [ACT, INA, PEN]
 *                 example: "ACT"
 *     responses:
 *       200:
 *         description: Estado del usuario cambiado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado del usuario cambiado correctamente ☺️"
 *                 historyUserStatus:
 *                   type: object
 *                   properties:
 *                     idUser:
 *                       type: string
 *                       example: "123"
 *                     idUserStatus:
 *                       type: string
 *                       example: "ACT"
 *       400:
 *         description: Faltan parámetros o el estado no es permitido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan parametro(s)" / "El estado del usuario no es permitido."
 *       404:
 *         description: El ID del modificador no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El id del modificador no existe."
 *       500:
 *         description: Error al cambiar el estado del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cambiar el estado del usuario"
 *       405:
 *         description: Método no permitido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Metodo no permitido"
 */
const handler = async (req, res) => {
    if (req.method === 'PUT') {
        const { idUser, reason, idModifier, status } = req.body;

        if (!idUser || !reason || !idModifier || !status) {
            return res.status(400).json({ message: 'Faltan parametro(s)' });
        }

        const allowedStatus = ['ACT', 'INA', 'PEN'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: 'El estado del usuario no es permitido.' });
        }

        try {
            const modifierExists = await prisma.user.findUnique({
                where: { id_user: idModifier }
            });

            if (!modifierExists) {
                return res.status(404).json({ message: 'El id del modificador no existe.' });
            }

            const historyUser = await prisma.history_user_status.update({
                where: { id_user: idUser },
                data: {
                    id_user_status: status,
                    date_hour_userstatus: new Date(),
                    created_hiuserstatus_by: idModifier,
                    reason_status_change: reason
                }
            })

            const historyUserStatus = {
                idUser: historyUser.id_user,
                idUserStatus: historyUser.id_user_status,
            }

            res.status(200).json({ message: 'Estado del usuario cambiado correctamente ☺️', historyUserStatus});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al cambiar el estado del usuario' });
        }
    } else {
        res.status(405).json({ message: 'Metodo no permitido' });
    }
}

export default handler;