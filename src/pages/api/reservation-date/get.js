import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/reservation-date:
 *   get:
 *     summary: Retrieve a list of reservation dates
 *     description: Fetches all reservation dates from the database.
 *     responses:
 *       200:
 *         description: A list of reservation dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The reservation date ID
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The reservation date
 *       500:
 *         description: Internal server error
 */

/**
 * Handles the GET request to retrieve reservation dates.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
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