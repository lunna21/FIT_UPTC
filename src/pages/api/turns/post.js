import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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