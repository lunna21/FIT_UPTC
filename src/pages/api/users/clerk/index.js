// import { users } from '@clerk/clerk-sdk-node';
import { getAuth, clerkClient } from '@clerk/nextjs/server'

export default async function handler(req, res) {
    // Await the resolution of clerkClient
    const client = await clerkClient();

    if(req.method === 'GET') {
        try {
            const { username } = req.query;

            if (!username) {
                console.error('El nombre de usuario es requerido');
                return res.status(400).json({ message: 'El nombre de usuario es requerido' });
            }

            const url = new URL(`https://api.clerk.dev/v1/users`);
            url.searchParams.append("username", username); // Añadir el parámetro username
        
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            });
        
            if (!response.ok) {
                const error = await response.json();
                console.error("Error en la solicitud:", error);
                return res.status(500).json({ message: 'Error en la solicitud' });
            }
        
            const users = await response.json();
        
            if (users.length === 0) {
              return res.status(400).json({ message: `No se encontró el usuario con username: ${username}`});
            }
        
            return res.status(200).json(users[0]); // Retorna el primer usuario encontrado
          } catch (error) {
            console.error("Error al buscar el usuario:", error);
            throw error;
          }
    }

    if (req.method === 'POST') {
        const { email, password, username } = req.body;

        console.log('User Data:', { email, password, username });

        try {
            const user = await client.users.createUser({
                emailAddress: [email],
                password: password,
                username: username,
            });

            const token = await client.signInTokens.createSignInToken({
                expiresInSeconds: 86400,
                userId: user.id,
            });

            // send email with token for authentication sign in
            console.log('Token:', token);

            return res.status(200).json({ message: 'Credenciales de usuario correctas', user, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Hubo un error en la creación del usuario' });
        }
    }

    if (req.method === 'PUT') {
        let { userId } = getAuth(req);

        const { id, role, status } = req.body;

        if (id) {
            userId = id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'No Logged In User' });
        }

        if (!role || !status) {
            console.error('Role and Status are required');
            return res.status(400).json({ error: 'Role and Status are required' });
        }

        try {
            // Verifica si client y client.users están definidos
            if (!client || !client.users) {
                throw ('client or client.users is not defined');
            }

            // Actualiza los metadatos del usuario
            const result = await client.users.updateUser(userId, {
                publicMetadata: {
                    role,
                    status,
                },
            });

            return res.status(200).json({ message: result.publicMetadata });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'There was an error updating the user metadata.' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
