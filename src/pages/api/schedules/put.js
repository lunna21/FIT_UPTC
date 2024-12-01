import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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