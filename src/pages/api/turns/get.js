import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/turns/get:
 *   get:
 *     summary: Retrieve turns based on the specified day or all turns if no day is specified.
 *     parameters:
 *       - in: query
 *         name: day
 *         schema:
 *           type: string
 *           enum: [LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO]
 *         description: The day of the week to filter turns.
 *     responses:
 *       200:
 *         description: A list of turns.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTurn:
 *                     type: integer
 *                     description: The ID of the turn.
 *                   maxCapacity:
 *                     type: integer
 *                     description: The maximum capacity of the turn.
 *                   day:
 *                     type: string
 *                     description: The day of the turn.
 *                   status:
 *                     type: string
 *                     description: The status of the turn.
 *                   colorTurn:
 *                     type: string
 *                     description: The color associated with the turn.
 *                   startTime:
 *                     type: string
 *                     format: time
 *                     description: The start time of the turn.
 *                   endTime:
 *                     type: string
 *                     format: time
 *                     description: The end time of the turn.
 *                   createdTurnAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the turn.
 *                   updatedTurnAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the turn.
 *       400:
 *         description: Invalid day parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
export default async function getHandler(req, res) {
    const day = req.query.day;

    if (day) {
        if(day !== 'LUNES' && day !== 'MARTES' && day !== 'MIERCOLES' && day !== 'JUEVES' && day !== 'VIERNES' && day !== 'SABADO'){
            return res.status(400).json({ message: 'Parece que no hay turnos disponibles ¡Intenta después 🫡!' });
        }

        try {
            const turns = await prisma.turn.findMany({
                where: {
                    day: day
                },
                orderBy: {
                    start_time: 'asc'
                }
            });
            const formattedTurns = turns.map(turn => ({
                idTurn: turn.id_turn,
                maxCapacity: turn.max_capacity,
                day: turn.day,
                status: turn.status,
                colorTurn: turn.color_turn,
                startTime: turn.start_time.toISOString().split('T')[1].split('.')[0],
                endTime: turn.end_time.toISOString().split('T')[1].split('.')[0],
                createdTurnAt: turn.created_turn_at,
                updatedTurnAt: turn.updated_turn_at
            }));
            res.status(200).json(formattedTurns);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        try {
            const turns = await prisma.turn.findMany({
                orderBy: {
                    start_time: 'asc'
                }
            });
            const formattedTurns = turns.map(turn => ({
                idTurn: turn.id_turn,
                maxCapacity: turn.max_capacity,
                day: turn.day,
                status: turn.status,
                colorTurn: turn.color_turn,
                startTime: turn.start_time.toISOString().split('T')[1].split('.')[0],
                endTime: turn.end_time.toISOString().split('T')[1].split('.')[0],
                createdTurnAt: turn.created_turn_at,
                updatedTurnAt: turn.updated_turn_at
            }));
            res.status(200).json(formattedTurns);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    }
}