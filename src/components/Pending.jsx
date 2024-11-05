import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { updateMetadataUser } from "@/db/user";
import Link from 'next/link';

import Loader from '@/components/Loader';
import Button from '@/components/buttons/Button';

// icon to redirect to the login
import { FaSignInAlt } from 'react-icons/fa';

const Pending = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const updateMetadata = async () => {
            setIsLoading(true);
            try {
                const response = await updateMetadataUser({
                    username: user.username,
                    rol: 'STU',
                    status: 'PEN',
                });
                console.log('updateMetadata', response);
                setIsLoading(false);
            }
            catch (error) {
                console.error('Error updating metadata:', error);
                setIsLoading(false);
            }
        }
        if (user) {
            updateMetadata();
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Loader />
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">El personal del gimnasio ha recibido tu solicitud satisfactoriamente</h1>
                <h2 className="text-xl text-gray-700 mb-2">Por favor, espera a que el personal del gimnasio confirme tu solicitud</h2>
                <h3 className="text-lg text-gray-600 mb-6">Te enviaremos un correo cuando tu solicitud sea confirmada</h3>
                <Link href="/login">
                    <Button
                        Icon={FaSignInAlt}
                        buttonText='Iniciar sesión'
                    />
                </Link>
            </div>
        </div>
    )
};

export default Pending;