import { useUser } from '@clerk/nextjs';
import { 
    updateStatusUser, 
    updateMetadataExternalUser,
    getUserByUsername,
    getUserByUsernameWithClerk,
    getUserById
} from '../db/user';

const useUpdateStatusUser = () => {
    const { user } = useUser();

    const updateStatus = async ({ idUser, status, reason, username }) => {
        try {
            const actualUser = await getUserByUsername(user.username);
            const idModifier = actualUser.id_user;
            
            const userdb = await getUserByUsername(username);
            const role = userdb.id_role_user;

            const response = await updateStatusUser({ idUser, status, reason, idModifier });

            const userClerk = await getUserByUsernameWithClerk(username);
            await updateMetadataExternalUser({ id: userClerk.id, role, status})
            return response;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw error.message;
        }
    }

    return { updateStatus };
}

export default useUpdateStatusUser;