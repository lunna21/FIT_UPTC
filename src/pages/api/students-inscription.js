import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/students-inscription:
 *   get:
 *     summary: Obtiene la lista de estudiantes con sus detalles.
 *     description: Retorna una lista de estudiantes inscritos con sus detalles personales.
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombreCompleto:
 *                     type: string
 *                     description: Nombre completo del estudiante.
 *                   codigoEstudiantil:
 *                     type: string
 *                     description: Código estudiantil del estudiante.
 *                   correoElectronico:
 *                     type: string
 *                     description: Correo electrónico del estudiante.
 *                   numeroTelefono:
 *                     type: string
 *                     description: Número de teléfono del estudiante.
 *                   estado:
 *                     type: string
 *                     description: Estado del estudiante.
 *       401:
 *         description: No autorizado. El usuario no está autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
export async function GET() {
  try {
    // Verificar autenticación con Clerk
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtener los estudiantes con sus detalles
    const students = await prisma.inscription_detail.findMany({
      select: {
        student_code: true,
        person: {
          select: {
            first_name_person: true,
            last_name_person: true,
            email_person: true,
            phone_number_person: true,
          }
        }
      },
      include: {
        person: true
      }
    });

    // Transformar los datos al formato deseado
    const formattedStudents = students.map(student => ({
      nombreCompleto: `${student.person.first_name_person} ${student.person.last_name_person}`,
      codigoEstudiantil: student.student_code,
      correoElectronico: student.person.email_person,
      numeroTelefono: student.person.phone_number_person || 'No disponible',
      // Nota: El estado podría venir de otra tabla o ser calculado según la lógica de negocio
      estado: 'Activo' // Este es un valor por defecto
    }));

    return NextResponse.json(formattedStudents);

  } catch (error) {
    console.error('Error al obtener los estudiantes:', error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

