import { PrismaClient } from '@prisma/client';
import { checkFormatDate } from '@/utils/utils'

const prisma = new PrismaClient();

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