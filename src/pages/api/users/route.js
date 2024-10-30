import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para manejar el método POST
export async function POST(req, res) {
    const {
        id,
        nombre_usuario,
        email,
        password,
        role,
    } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                id: BigInt(id), // Convert id to BigInt
                nombre_usuario,
                email,
                password,
                role,
            },
        });
        res.status(201).json({
            ...user,
            id: user.id.toString() // Convert id back to string for JSON response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
}

// Función para manejar el método GET
export async function GET(req, res) {
    try {
        const users = await prisma.user.findMany();
        const usersWithStringId = users.map(user => ({
            ...user,
            id: user.id.toString() // Convert id to string for JSON response
        }));
        res.status(200).json(usersWithStringId);
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