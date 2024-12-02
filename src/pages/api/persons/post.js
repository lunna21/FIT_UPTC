import { PrismaClient } from '@prisma/client';
import { validatePerson } from '@/utils/validations';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/persons/post:
 *   post:
 *     summary: Crea una nueva persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document_number_person:
 *                 type: string
 *                 description: Número de documento de la persona
 *               id_document_type:
 *                 type: integer
 *                 description: ID del tipo de documento
 *               first_name_person:
 *                 type: string
 *                 description: Nombre de la persona
 *               last_name_person:
 *                 type: string
 *                 description: Apellido de la persona
 *               phone_number_person:
 *                 type: string
 *                 description: Número de teléfono de la persona
 *               birthdate_person:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la persona
 *               created_person_by:
 *                 type: string
 *                 description: Usuario que crea la persona
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document_number_person:
 *                   type: string
 *                 id_document_type:
 *                   type: integer
 *                 first_name_person:
 *                   type: string
 *                 last_name_person:
 *                   type: string
 *                 phone_number_person:
 *                   type: string
 *                 birthdate_person:
 *                   type: string
 *                   format: date
 *                 created_person_by:
 *                   type: string
 *                 created_person_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error del sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export default async function postHandler(req, res) {
  try {
    const data = req.body;
    const {
      document_number_person,
      id_document_type,
      first_name_person,
      last_name_person,
      phone_number_person,
      birthdate_person,
      created_person_by,
    } = data;

    // Validar persona
    const personValidation = validatePerson({
      document_number_person,
      id_document_type,
      first_name_person,
      last_name_person,
      phone_number_person,
      birthdate_person
    });

    if (!personValidation.isValid) {
      console.log(personValidation.errors);
      const errorMessages = Object.values(personValidation.errors).flat().join(', ');
      return res.status(400).json(
        { message: `${errorMessages}` }
      );
    }

    // Verificar si ya existe una persona con el mismo número de documento
    const existingPerson = await prisma.person.findFirst({
      where: { document_number_person: document_number_person },
    });

    if (existingPerson) {
      return res.status(400).json(
        { message: 'Ya existe una persona con este número de documento' }
      );
    }

    // Validar y convertir la fecha de nacimiento
    const birthdate = new Date(birthdate_person);
    if (isNaN(birthdate.getTime())) {
      return res.status(400).json(
        { message: 'Fecha de nacimiento no válida' }
      );
    }

    // Crear la persona en la base de datos
    const newPerson = await prisma.$transaction(async (prisma) => {
      return await prisma.person.create({
        data: {
          document_number_person: document_number_person,
          id_document_type,
          first_name_person: first_name_person.toLowerCase().trim(),
          last_name_person: last_name_person.toLowerCase().trim(),
          phone_number_person,
          birthdate_person: birthdate,
          created_person_by,
          created_person_at: new Date(),
        },
      });
    }, {timeout: 60000});

    return res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);

    if (error.code === 'P2002') {
      // Prisma unique constraint error
      const uniqueField = error.meta.target;
      console.log('Unique field:', uniqueField);
      let errorMessage = 'Error al crear la persona';

      switch (uniqueField) {
        case 'pers_uk_document_person':
          errorMessage = 'El número de documento ya está registrado';
          break;
        // Add more cases if there are other unique fields
      }

      return res.status(400).json({ message: errorMessage });
    }

    return res.status(500).json({ message: 'Error del sistema, por favor intenta más tarde' });
  }
}