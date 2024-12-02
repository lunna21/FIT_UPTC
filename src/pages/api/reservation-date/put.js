import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/reservation-date/put:
 *   put:
 *     summary: Actualiza la fecha de reserva
 *     description: Actualiza la fecha de reserva en la base de datos.
 *     tags:
 *       - Reservation Date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID del usuario que actualiza la fecha de reserva
 *                 example: "12345"
 *               newDate:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de reserva
 *                 example: "2023-12-31T23:59:59Z"
 *     responses:
 *       200:
 *         description: Fecha de reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_history:
 *                   type: string
 *                   description: ID del historial de la fecha de reserva
 *                 updated_by:
 *                   type: string
 *                   description: ID del usuario que actualizó la fecha de reserva
 *                 reservation_date:
 *                   type: string
 *                   format: date-time
 *                   description: Nueva fecha de reserva
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Faltan datos para actualizar la fecha de reserva"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Internal server error"
 */
async function updateReservationDateHandler(req, res) {
    const { idUser, newDate } = req.body;

    if (!idUser || !newDate) {
        return res.status(400).json({ message: 'Faltan datos para actualizar la fecha de reserva' });
    }

    const date = new Date(newDate);

    if (date.toString() === 'Invalid Date') {
        return res.status(400).json({ message: 'Formato invalido de la fecha' });
    }

    const todayDate = new Date();
    if (date <= todayDate) {
        return res.status(400).json({ message: 'Las fechas de reservas no puede ser menor a la fecha actual' });
    }

    try {
        const reservationDates = await prisma.reservation_date_history.findMany();

        if (reservationDates.length === 0) {
            const newReservationDate = await prisma.reservation_date_history.create({
                data: { 
                    updated_by: idUser,
                    reservation_date: date 
                },
            });
            res.status(200).json(newReservationDate);
        } else {
            if(reservationDates[0].reservation_date.toISOString().split('T')[0] === date.toISOString().split('T')[0]) {
                return res.status(400).json({ message: 'La fecha de reserva ya fue actualizada' });
            }

            const updatedReservationDate = await prisma.reservation_date_history.update({
                where: { 
                    id_history: reservationDates[0].id_history
                },
                data: { 
                    updated_by: idUser,
                    reservation_date: date 
                },
            });
            res.status(200).json(updatedReservationDate);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}

export default updateReservationDateHandler;