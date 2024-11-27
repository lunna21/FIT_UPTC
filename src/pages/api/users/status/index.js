import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        const { idUser, reason, idModifier, status } = req.body;

        if (!idUser || !reason || !idModifier || !status) {
            return res.status(400).json({ message: 'Faltan parametro(s)' });
        }

        const allowedStatus = ['ACT', 'INA', 'PEN'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: 'El estado del usuario no es permitido.' });
        }

        try {
            const modifierExists = await prisma.user.findUnique({
                where: { id_user: idModifier }
            });

            if (!modifierExists) {
                return res.status(404).json({ message: 'El id del modificador no existe.' });
            }

            const historyUser = await prisma.history_user_status.update({
                where: { id_user: idUser },
                data: {
                    id_user_status: status,
                    date_hour_userstatus: new Date(),
                    created_hiuserstatus_by: idModifier,
                    reason_status_change: reason
                }
            })

            const historyUserStatus = {
                idUser: historyUser.id_user,
                idUserStatus: historyUser.id_user_status,
            }

            res.status(200).json({ message: 'Estado del usuario cambiado correctamente ☺️', historyUserStatus});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al cambiar el estado del usuario' });
        }
    } else {
        res.status(405).json({ message: 'Metodo no permitido' });
    }
}

export default handler;