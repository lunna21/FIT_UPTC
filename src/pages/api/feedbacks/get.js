import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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