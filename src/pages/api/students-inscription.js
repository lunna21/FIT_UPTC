import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Verificar autenticación con Clerk
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtener los estudiantes con sus detalles
    const students = await prisma.inscriptionDetail.findMany({
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












// const express = require('express');
// const { Pool } = require('pg');
// const config = require('./config');

// const app = express();
// const port = 3100;

// // Configura la conexión a la base de datos
// const pool = new Pool(config.db);

// app.get('/students.inscription', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.full_name, 
//         ida.new_student_code, 
//         p.email, 
//         p.phone_number, 
//         ida.new_blood_type, 
//         ida.new_id_eps, 
//         ida.new_id_emecont, 
//         ida.change_instdetaud_timestamp 
//       FROM 
//         INSCRIPTION_DETAIL_AUDIT ida 
//       JOIN 
//         PERSONAS p ON ida.insdetail_id = p.id 
//       WHERE 
//         ida.change_type = 'INSERT' 
//         OR (ida.change_type = 'UPDATE' AND ida.audit_id IN (
//           SELECT MAX(audit_id) 
//           FROM INSCRIPTION_DETAIL_AUDIT 
//           GROUP BY insdetail_id
//         )) 
//       ORDER BY 
//         ida.change_instdetaud_timestamp DESC;
//     `;

//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error ejecutando la consulta:', error);
//     res.status(500).json({ error: 'Error al obtener los datos' });
//   }
// });

// app.listen(port, () => {
//   console.log(`API escuchando en http://localhost:${port}`);
// });
