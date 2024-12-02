import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**
 * @swagger
 * /api/persons:
 *   get:
 *     summary: Retrieve a list of persons or a specific person by document number
 *     description: Returns a list of all persons if no document number is provided, or a specific person if a document number is provided.
 *     parameters:
 *       - in: query
 *         name: document_number
 *         schema:
 *           type: string
 *         required: false
 *         description: The document number of the person to retrieve
 *     responses:
 *       200:
 *         description: A list of persons or a specific person
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The person ID
 *                   name:
 *                     type: string
 *                     description: The person's name
 *                   document_number_person:
 *                     type: string
 *                     description: The person's document number
 *       404:
 *         description: Person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
export default async function getHandler(req, res) {
    const { document_number } = req.query;

    try {
        let persons;

        if (!document_number || document_number == 'undefined' || document_number == 'null') {
            console.log("Devolviendo todas las personas", document_number);
            persons = await prisma.person.findMany();
        } else {
            persons = await prisma.person.findFirst({
                where: {
                    document_number_person: document_number,
                }
            });

            if (!persons) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
        }

        return res.status(200).json(persons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}