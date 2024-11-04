import { PrismaClient } from '@prisma/client';
import { validatePerson } from '@/utils/validations';

const prisma = new PrismaClient();

export default async function postHandler(req, res) {
  try {
    const data = req.body;
    const {
      document_number_person,
      id_document_type,
      first_name_person,
      last_name_person,
      phone_number_person,
      email_person,
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
      email_person,
      birthdate_person
    });

    console.log(personValidation)

    if (!personValidation.isValid) {
      return res.status(400).json(
        { error: 'Errores de validación en los datos de la persona', details: personValidation.errors }
      );
    }

    // Verificar si ya existe una persona con el mismo número de documento
    const existingPerson = await prisma.person.findFirst({
      where: { document_number_person: parseInt(document_number_person) },
    });

    if (existingPerson) {
      return res.status(400).json(
        { error: 'Ya existe una persona con este número de documento' }
      );
    }

    // Validar y convertir la fecha de nacimiento
    const birthdate = new Date(birthdate_person);
    if (isNaN(birthdate.getTime())) {
      return res.status(400).json(
        { error: 'Fecha de nacimiento no válida' }
      );
    }

    // Crear la persona en la base de datos
    const newPerson = await prisma.person.create({
      data: {
        document_number_person: parseInt(document_number_person),
        id_document_type,
        first_name_person: first_name_person.toLowerCase().trim(),
        last_name_person: last_name_person.toLowerCase().trim(),
        phone_number_person,
        email_person,
        birthdate_person: birthdate,
        created_person_by,
        created_person_at: new Date(),
      },
    });

    return res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    return res.status(500).json({ error: 'Error al crear la persona' });
  }
}