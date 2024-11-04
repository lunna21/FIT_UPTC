import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const documentNumber = parseInt(id);

            const person = await prisma.person.findFirst({
                where: {
                    document_number_person: documentNumber,
                },
            });

            if (!person) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }

            return res.status(200).json(person);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error retrieving person' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}