import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function gethandler(req, res) {
    try {
        const users = await prisma.user.findMany();
        const { username } = req.query;

        if (username) {
            const user = await prisma.user.findUnique({
                where: { name_user: username },
            });
            if (user) {
                const historyStatus = await prisma.history_user_status.findMany({
                    where: { id_user: user.id_user },
                    orderBy: { date_hour_userstatus: 'desc' },
                    take: 1
                });

                const userWithStatus = {
                    ...user,
                    id_status: historyStatus.length > 0 ? historyStatus[0].id_user_status : null
                };

                return res.status(200).json(userWithStatus);
            } else {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}