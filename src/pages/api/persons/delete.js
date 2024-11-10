import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function deleteHandler(req, res) {
    const { document_number } = req.query;

    const documentNumber = document_number;

    if (req.method === 'DELETE') {
        try {
            // Encuentra la persona por el document_number
            const person = await prisma.person.findUnique({
                where: {
                    document_number_person: documentNumber,
                },
                include: {
                    inscription_detail: {
                        include: {
                            inscription_detail_audit: true,
                            inscripdetail_presmed: true,
                        },
                    },
                    user_user_id_personToperson: true,
                },
            });

            if (!person) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }

            // Elimina las entradas relacionadas en las tablas foráneas
            await prisma.inscription_detail_audit.deleteMany({
                where: {
                    insdetail_id: {
                        in: person.inscription_detail.map(detail => detail.id_insdetail),
                    },
                },
            });

            await prisma.inscripdetail_presmed.deleteMany({
                where: {
                    id_insdetail: {
                        in: person.inscription_detail.map(detail => detail.id_insdetail),
                    },
                },
            });

            await prisma.inscription_detail.deleteMany({
                where: {
                    id_estu: person.id_person,
                },
            });

            await prisma.user.deleteMany({
                where: {
                    id_person: person.id_person,
                },
            });

            // Elimina la persona
            await prisma.person.delete({
                where: {
                    id_person: person.id_person,
                },
            });

            return res.status(200).json({ message: 'Persona eliminada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al eliminar la persona' });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}
