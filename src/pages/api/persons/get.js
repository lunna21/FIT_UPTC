import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function getHandler(req, res) {
    const { document_number } = req.query;

    try {
        let persons;

        if (!document_number || document_number == 'undefined' || document_number == 'null') {
            persons = await prisma.person.findMany();
        } else {
            persons = await prisma.person.findFirst({
                where: {
                    document_number_person: document_number,
                }
            });

            if (!persons) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }
        }

        return res.status(200).json(persons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}