import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/InputValidation';
import Loader from '@/components/Loader';

import { FaUnlock } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

// pass the username to the function
import { getUserByUsername, updateMetadataUser } from '@/db/user';

const ChangePasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();
    const { user } = useUser();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const userDB = await getUserByUsername(user.username);
            if (userDB) {
                console.log('UserDB:', userDB);
                await updateMetadataUser({ role: userDB.id_role_user, status: userDB.id_status });
                user.updatePassword({
                    currentPassword: userDB.password_user,
                    newPassword: newPassword,
                    signOutOfOtherSessions: true,
                })
                setSuccess('Contraseña cambiada exitosamente');
                setError('');
                setIsLoading(false);
                setTimeout(() => {
                    router.refresh();
                }, 1500);
            } else {
                setIsLoading(false);
                setError('Usuario no encontrado');
                return;
            }
        } catch (err) {
            setIsLoading(false);
            console.error('error', err);
            setError('Hubo un error al cambiar la contraseña');
        }
    };

    if (isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Loader />
            </div>
        )
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="mx-auto max-w-md p-8 rounded-lg shadow-lg bg-neutral-gray-light text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenid@ {user?.username} !!</h1>
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <Input
                        label="Contraseña"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        Icon={BsFillShieldLockFill}
                    />
                    <Input
                        label="Confirmar Contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        Icon={BsFillShieldLockFill}
                    />
                    <Button
                        buttonText="Cambiar Contraseña"
                        type="submit"
                        Icon={FaUnlock}
                        disabled={!newPassword || !confirmPassword}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;