import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
            const turns = await prisma.turn.findMany();
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