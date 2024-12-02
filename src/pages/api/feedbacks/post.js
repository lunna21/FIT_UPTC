import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/feedbacks/post:
 *   post:
 *     summary: Crea un nuevo feedback
 *     description: Endpoint para crear un nuevo feedback de un usuario.
 *     tags:
 *       - Feedbacks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: ID del usuario que deja el feedback
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 description: Puntuación del feedback (entre 1 y 5)
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Comentario del feedback (opcional, máximo 200 caracteres)
 *                 example: "Excelente servicio"
 *     responses:
 *       201:
 *         description: Feedback creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_feedback:
 *                   type: integer
 *                   description: ID del feedback creado
 *                   example: 1
 *                 id_user:
 *                   type: integer
 *                   description: ID del usuario que dejó el feedback
 *                   example: 1
 *                 rating:
 *                   type: integer
 *                   description: Puntuación del feedback
 *                   example: 5
 *                 comment:
 *                   type: string
 *                   description: Comentario del feedback
 *                   example: "Excelente servicio"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del feedback
 *                   example: "2023-10-05T14:48:00.000Z"
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
 *                   example: "El id del usuario es requerido"
 *       405:
 *         description: Método no permitido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Method not allowed"
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
 *                   example: "Error guardando tú opinión."
 */
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id_user, rating, comment } = req.body;

        if (!id_user) {
            return res.status(400).json({ message: 'El id del usuario es requerido' });
        }

        if (!rating) {
            return res.status(400).json({ message: 'La puntuación es requerida' });
        }

        if ( rating < 1 || rating > 5 ) {
            return res.status(400).json({ message: 'La puntuación debe ser un valor entre 1 y 5' });
        }

        if (comment && comment?.length > 200) {
            return res.status(400).json({ message: 'El comentario no puede tener más de 200 caracteres' });
        }

        try {
            const feedback = await prisma.feedback.create({
                data: {
                    id_user,
                    rating,
                    comment,
                },
            });
            res.status(201).json(feedback);
        } catch (message) {
            res.status(500).json({ message: 'Error guardando tú opinión.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}