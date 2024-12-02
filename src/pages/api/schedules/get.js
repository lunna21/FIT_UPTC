import { PrismaClient } from '@prisma/client';
import { checkFormatDate } from '@/utils/utils'

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/schedules/get:
 *   get:
 *     summary: Retrieve schedules based on the provided date.
 *     description: Fetches schedules from the database. If a date is provided, it fetches schedules for that specific date. Otherwise, it fetches all schedules.
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The date to filter schedules by.
 *     responses:
 *       200:
 *         description: A list of schedules.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date_schedule:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                   turn:
 *                     type: object
 *       400:
 *         description: Invalid date format.
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
    const { date } = req.query;

    if (!checkFormatDate(date)) {
        return res.status(400).json({ message: 'Formato invalido de la fecha' });
    }

    try {
        let schedules;
        if (date) {
            schedules = await prisma.schedule.findMany({
                where: {
                    date_schedule: new Date(date),
                },
                include: {
                    user: true,
                    turn: true,
                },
            });
        } else {
            schedules = await prisma.schedule.findMany();
            res.status(200).json(schedules);
        }
        res.status(200).json(schedules);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}