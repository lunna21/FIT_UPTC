import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Retrieve feedbacks
 *     description: Retrieve feedbacks from the database. If an id_user query parameter is provided, it will return feedbacks for that specific user.
 *     parameters:
 *       - in: query
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the user to retrieve feedbacks for
 *     responses:
 *       200:
 *         description: A list of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_feedback:
 *                     type: integer
 *                   id_user:
 *                     type: integer
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   user_feedback_id_userTouser:
 *                     type: object
 *                     properties:
 *                       id_user:
 *                         type: integer
 *                       name_user:
 *                         type: string
 *                       person_user_id_personToperson:
 *                         type: object
 *                         properties:
 *                           id_person:
 *                             type: integer
 *                           first_name_person:
 *                             type: string
 *                           last_name_person:
 *                             type: string
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Error fetching feedbacks
 */
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id_user } = req.query;

        try {
            const feedbacks = id_user
                ? await prisma.feedback.findMany({ where: { id_user: parseInt(id_user) } })
                : await prisma.feedback.findMany({
                    include: {
                        user_feedback_id_userTouser: {
                            include: {
                                person_user_id_personToperson: true
                            }
                        }
                    }
                });
            res.status(200).json(feedbacks);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            res.status(500).json({ error: 'Error fetching feedbacks' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}