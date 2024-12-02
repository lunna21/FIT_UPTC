import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/schedules/put:
 *   put:
 *     summary: Actualiza el estado de una reserva
 *     description: Actualiza el estado de una reserva en la base de datos.
 *     tags:
 *       - Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_schedule
 *               - state_schedule
 *             properties:
 *               id_schedule:
 *                 type: integer
 *                 description: ID de la reserva
 *               state_schedule:
 *                 type: string
 *                 description: Nuevo estado de la reserva
 *                 enum: [PENDING, ATTEND, MISSED, CANCELLED]
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_schedule:
 *                   type: integer
 *                 state_schedule:
 *                   type: string
 *                 user:
 *                   type: object
 *                 turn:
 *                   type: object
 *       400:
 *         description: Datos requeridos faltantes o estado de la reserva no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export default async function putHandler(req, res) {

    const { id_schedule, state_schedule } = req.body;

    if (!id_schedule || !state_schedule) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const validStates = ['PENDING', 'ATTEND', 'MISSED', 'CANCELLED'];
    if (!validStates.includes(state_schedule)) {
        return res.status(400).json({ message: 'El estado de la reserva no es válido.' });
    }

    try {
        const currentSchedule = await prisma.schedule.findUnique({
            where: { id_schedule: parseInt(id_schedule) },
        });

        if (currentSchedule.state_schedule === 'ATTEND') {
            return res.status(400).json({ message: 'Ya asististe al turno 🧐.' });
        }

        const updatedSchedule = await prisma.schedule.update({
            where: { id_schedule: parseInt(id_schedule) },
            data: { state_schedule },
            include: {
                user: true,
                turn: true,
            },
        });

        return res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}