import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getReservationDateHandler(req, res) {
    try {
        const reservationDates = await prisma.reservation_date_history.findMany();
        res.status(200).json(reservationDates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}

export default getReservationDateHandler;