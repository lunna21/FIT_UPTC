import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/turns/post:
 *   post:
 *     summary: Crea un nuevo turno
 *     tags: [Turns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - max_capacity
 *               - day
 *               - start_time
 *               - end_time
 *             properties:
 *               max_capacity:
 *                 type: integer
 *                 description: Capacidad máxima del turno
 *               day:
 *                 type: string
 *                 description: Día de la semana
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Hora de inicio del turno (HH:MM)
 *               end_time:
 *                 type: string
 *                 format: time
 *                 description: Hora de fin del turno (HH:MM)
 *               color_turn:
 *                 type: string
 *                 description: Color del turno
 *               status:
 *                 type: string
 *                 description: Estado del turno
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idTurn:
 *                   type: integer
 *                   description: ID del turno
 *                 maxCapacity:
 *                   type: integer
 *                   description: Capacidad máxima del turno
 *                 day:
 *                   type: string
 *                   description: Día de la semana
 *                 status:
 *                   type: string
 *                   description: Estado del turno
 *                 colorTurn:
 *                   type: string
 *                   description: Color del turno
 *                 startTime:
 *                   type: string
 *                   format: time
 *                   description: Hora de inicio del turno (HH:MM)
 *                 endTime:
 *                   type: string
 *                   format: time
 *                   description: Hora de fin del turno (HH:MM)
 *                 createdTurnAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del turno
 *                 updatedTurnAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización del turno
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                 error:
 *                   type: string
 *                   description: Detalles del error
 */
export default async function postHandler(req, res) {

    const { max_capacity, day, start_time, end_time, color_turn, status } = req.body;

    if (!max_capacity || !day || !start_time || !end_time) {
        return res.status(400).json({ message: 'Faltan datos para crear el nuevo turno' });
    }

    const daysAllowed = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

    if (!daysAllowed.includes(day.toUpperCase())) {
        return res.status(400).json({ message: 'Día de la semana no permitido.' });
    }

    if (start_time >= end_time) {
        return res.status(400).json({ message: 'La hora de inicio debe ser menor a la hora de fin.' });
    }

    if (start_time < '05:00' || end_time > '21:00') {
        return res.status(400).json({ message: 'El horario de atención es de 05:00am a 09:00pm.' });
    }

    if (max_capacity <= 0) {
        return res.status(400).json({ message: 'La capacidad del turno debe ser mayor que 0'})
    }

    try {
        const turnsWithSameDay = await prisma.turn.findMany({
            where: {
                day,
                OR: [
                    {
                        start_time: {
                            lte: new Date(`1970-01-01T${end_time}:00Z`),
                        },
                        end_time: {
                            gte: new Date(`1970-01-01T${start_time}:00Z`),
                        },
                    },
                ],
            },
        });

        const existingTurns = await prisma.turn.findMany({
            where: {
                day: day,
            },
        });

        const startTime = new Date(`1970-01-01T${start_time}:00Z`);
        const endTime = new Date(`1970-01-01T${end_time}:00Z`);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos

        for (const turn of existingTurns) {
            const existingStartTime = new Date(turn.start_time);
            const existingEndTime = new Date(turn.end_time);

            if (
                Math.abs(startTime - existingStartTime) < fiveMinutes ||
                Math.abs(startTime - existingEndTime) < fiveMinutes ||
                Math.abs(endTime - existingStartTime) < fiveMinutes ||
                Math.abs(endTime - existingEndTime) < fiveMinutes
            ) {
                return res.status(400).json({ message: 'Cada turno debe crearse con al menos 5 minutos de diferencia.' });
            }
        }

        if (turnsWithSameDay.length > 0) {
            return res.status(400).json({ message: 'Ya existe un turno en el mismo intervalo de tiempo.' });
        }



        const newTurn = await prisma.turn.create({
            data: {
                max_capacity: parseInt(max_capacity),
                day: day,
                status: status || 'BLOCK',
                start_time: new Date(`1970-01-01T${start_time}:00Z`),
                end_time: new Date(`1970-01-01T${end_time}:00Z`),
                color_turn: color_turn || 'rgba(49, 49, 49, 0.72)',
            },
        });

        const formattedTurn = {
            idTurn: newTurn.id_turn,
            maxCapacity: newTurn.max_capacity,
            day: newTurn.day,
            status: newTurn.status,
            colorTurn: newTurn.color_turn,
            startTime: newTurn.start_time.toISOString().split('T')[1].split('.')[0],
            endTime: newTurn.end_time.toISOString().split('T')[1].split('.')[0],
            createdTurnAt: newTurn.created_turn_at,
            updatedTurnAt: newTurn.updated_turn_at
        };

        res.status(201).json(formattedTurn);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error: error });
    } finally {
        await prisma.$disconnect();
    }
}