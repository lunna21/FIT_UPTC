import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para manejar el método POST
export async function POST(req, res) {
  const { document, firstName, lastName, email } = req.body;
  try {
    const person = await prisma.personas.create({
      data: {
        document,
        firstName,
        lastName,
        email,
      },
    });
    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating person" });
  }
}

// Función para manejar el método GET
export async function GET(req, res) {
  try {
    const people = await prisma.pERSON.findMany();
    res.status(200).json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving people" });
  }
}

// Función principal de handler que llama a las funciones específicas
export default async function handler(req, res) {
  if (req.method === 'POST') {
    return POST(req, res);
  } else if (req.method === 'GET') {
    return GET(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
