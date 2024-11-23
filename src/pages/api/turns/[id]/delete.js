import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query; // 'id'
    const turnId = parseInt(id);

    if (req.method === 'DELETE') {
        try {
            const turn = await prisma.turn.findUnique({
                where: {
                    id_turn: turnId,
                }
            });

            if (!turn) {
                return res.status(404).json({ error: 'Turno no encontrado' });
            }

            await prisma.turn.delete({
                where: {
                    id_turn: turnId,
                }
            });

            return res.status(200).json({ message: 'Turno eliminado' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al eliminar el turno' });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}