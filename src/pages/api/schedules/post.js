import { PrismaClient } from '@prisma/client';
import { checkFormatDate } from '@/utils/utils'

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/schedules/post:
 *   post:
 *     summary: Create or update a schedule
 *     description: Creates a new schedule or updates an existing one if it is cancelled.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_schedule:
 *                 type: string
 *                 format: date
 *                 description: The date of the schedule.
 *               id_student:
 *                 type: integer
 *                 description: The ID of the student.
 *               id_turn:
 *                 type: integer
 *                 description: The ID of the turn.
 *               state_schedule:
 *                 type: string
 *                 description: The state of the schedule.
 *     responses:
 *       200:
 *         description: Schedule updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_schedule:
 *                   type: integer
 *                 date_schedule:
 *                   type: string
 *                   format: date
 *                 id_student:
 *                   type: integer
 *                 id_turn:
 *                   type: integer
 *                 state_schedule:
 *                   type: string
 *                 turn:
 *                   type: object
 *                 user:
 *                   type: object
 *       201:
 *         description: Schedule created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_schedule:
 *                   type: integer
 *                 date_schedule:
 *                   type: string
 *                   format: date
 *                 id_student:
 *                   type: integer
 *                 id_turn:
 *                   type: integer
 *                 state_schedule:
 *                   type: string
 *                 turn:
 *                   type: object
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request. Missing or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
export default async function handler(req, res) {
    const { date_schedule, id_student, id_turn, state_schedule } = req.body;

    if (!date_schedule || !id_student || !id_turn) {
        return res.status(400).json({ message: 'Faltan datos para realizar la insersión de la reserva.' });
    }

    if (!checkFormatDate(date_schedule)) {
        return res.status(400).json({ message: 'Formato invalido de la fecha.' });
    }

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const inputDate = new Date(date_schedule);

    if (
        inputDate.toDateString() !== today.toDateString() &&
        inputDate.toDateString() !== tomorrow.toDateString()
    ) {
        return res.status(400).json({ message: 'Solo se permiten reservas para hoy o mañana 🥴' });
    }

    try {
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                id_student,
                date_schedule: new Date(date_schedule),
            },
        });

        if (existingSchedule) {
            if (existingSchedule.state_schedule === 'CANCELLED') {
                const updatedSchedule = await prisma.schedule.update({
                    where: { id_schedule: existingSchedule.id_schedule },
                    data: {
                        id_turn,
                        state_schedule: state_schedule || 'PENDING',
                    },
                    include: {
                        turn: true,
                        user: true,
                    }
                });
                return res.status(200).json(updatedSchedule);
            } else {
                return res.status(400).json({ message: 'Ya existe una reservación para este usuario en la misma fecha.' });
            }
        }


        const newSchedule = await prisma.schedule.create({
            data: {
                date_schedule: new Date(date_schedule),
                id_student,
                id_turn,
                state_schedule: state_schedule || 'PENDING',
            }, 
            include: {
                turn: true,
                user: true,
            }
        });

        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}