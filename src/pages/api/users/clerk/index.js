// import { users } from '@clerk/clerk-sdk-node';
import { getAuth, clerkClient } from '@clerk/nextjs/server'

export default async function handler(req, res) {
    // Await the resolution of clerkClient
    const client = await clerkClient();

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

            return res.status(200).json({ message: 'User created successfully', user, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'There was an error creating the user' });
        }
    }

    if (req.method === 'PUT') {
        const { userId } = getAuth(req);

        const { role, status } = req.body;

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
