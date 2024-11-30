import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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