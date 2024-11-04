import { PrismaClient } from '@prisma/client'

export default async function getHandler(req, res) {
    const prisma = new PrismaClient();
    try {
        const persons = await prisma.person.findMany();
        return res.status(200).json(persons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener personas' });
    } finally {
        await prisma.$disconnect();
    }
}