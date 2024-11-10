import { useState, useEffect } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { updateMetadataUserStudent } from "@/db/user";

import Loader from '@/components/Loader';
import ButtonLogOut from '@/components/buttons/ButtonLogOut'

const Pending = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!user?.publicMetadata?.role && !user?.publicMetadata?.status) {
            const updateMetadata = async () => {
                setIsLoading(true);
                try {
                    await updateMetadataUserStudent();
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
        }
    }, [user]);

    if (isLoading || !isLoaded) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Loader />
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="relative bg-white shadow-md rounded-lg max-w-md w-full text-center px-10 py-20">
                <h2 className="text-2xl text-gray-700 mb-2">Por favor, espera a que el personal del gimnasio confirme tu solicitud</h2>
                <h3 className="text-xl text-gray-600 mb-6">Te enviaremos un correo cuando tu solicitud sea confirmada</h3>

                <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
                    <div className="absolute top-4 right-4">
                        <ButtonLogOut />
                    </div>
                </SignOutButton>
            </div>
        </div>
    )
};

export default Pending;