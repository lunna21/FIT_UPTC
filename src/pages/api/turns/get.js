import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getHandler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

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
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}