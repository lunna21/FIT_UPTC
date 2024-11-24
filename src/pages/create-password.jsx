import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/InputValidation';
import Loader from '@/components/Loader';
import PopMessage from '@/components/PopMessage';

import useShowPopUp from '@/hooks/useShowPopUp';

import { FaUnlock } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

// pass the username to the function
import { getUserByUsername, updateMetadataUser } from '@/db/user';

const ChangePasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {
        status,
        text,
        duration,
        onClose,
        isShow,
        showPopUp
    } = useShowPopUp();

    const router = useRouter();
    const { user } = useUser();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setIsLoading(false);
            showPopUp({ status: 'error', text: 'Las contraseñas no coinciden' });
            return;
        }

        try {
            const userDB = await getUserByUsername(user.username);
            if (userDB) {
                await updateMetadataUser({ role: userDB.id_role_user, status: userDB.id_status });
                user.updatePassword({
                    currentPassword: userDB.password_user,
                    newPassword: newPassword,
                    signOutOfOtherSessions: true,
                })
                showPopUp({ status: 'success', text: 'Contraseña cambiada exitosamente 💪' });
                setIsLoading(false);
                setTimeout(() => {
                    router.refresh();
                }, 1500);
            } else {
                setIsLoading(false);
                showPopUp({ status: 'error', text: 'Usuario no encontrado' });
                return;
            }
        } catch (err) {
            setIsLoading(false);
            console.error('error', err);
            showPopUp({ status: 'error', text: 'Usuario no encontrado' });
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
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
            <div className="mx-auto max-w-md p-8 rounded-lg shadow-lg bg-white text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenid@!!</h1>
                <p className="mb-4">Tu nombre de usuario para la aplicación es: <span className="font-semibold">{user?.username}</span></p>
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
                </form>
            </div>
            {
                isShow && (
                    <PopMessage
                        status={status}
                        text={text}
                        duration={duration}
                        onClose={onClose}
                    />
                )
            }
        </div>
    );
};

export default ChangePasswordPage;