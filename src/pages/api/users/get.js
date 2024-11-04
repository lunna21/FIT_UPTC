import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function gethandler(req, res) {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}