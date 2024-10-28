import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para manejar el método POST
export async function POST(req, res) {
    const { username, password, role, personId, id } = req.body;
    try {
        const user = await prisma.uSER.create({
            data: {
                username,
                password,
                role,
                personId,
                id,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
}

// Función para manejar el método GET
export async function GET(req, res) {
    try {
        const users = await prisma.uSER.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving users" });
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