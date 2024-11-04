import { getAuth, clerkClient } from '@clerk/nextjs/server';

const handlerClerk = async (req, res) => {
    if (req.method === 'PUT') {
        console.log('PUT /api/users/clerk');
        
        // Obtén el userId usando getAuth() en lugar de auth()
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ message: 'No Logged In User' });
        }

        const { username, role, status } = req.body;

        try {
            // Await the resolution of clerkClient
            const client = await clerkClient();

            // Verifica si client y client.users están definidos
            if (!client || !client.users) {
                throw new Error('client or client.users is not defined');
            }

            // Actualiza los metadatos del usuario
            const result = await client.users.updateUser(userId, {
                publicMetadata: {
                    username,
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
};

export default handlerClerk;
