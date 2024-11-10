import { useEffect, useState } from 'react';
import { useUser, UserProfile, SignOutButton } from '@clerk/nextjs';

const UserProfilePage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [shouldRenderProfile, setShouldRenderProfile] = useState(false);

    useEffect(() => {
        // Espera hasta que Clerk esté completamente cargado antes de permitir que UserProfile se renderice
        if (isLoaded && isSignedIn) {
            console.log(user)
            const role = user.publicMetadata?.role; // Asegúrate de que el rol esté en publicMetadata
            console.log('Rol del usuario:', role);
            setShouldRenderProfile(true);
        }
    }, [isLoaded, isSignedIn]);

    // Muestra un mensaje de carga o cualquier componente temporal mientras Clerk se carga
    if (!shouldRenderProfile) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Perfil del Usuario</h1>
            <UserProfile 
                only={['seguridad']}
            />
            <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}/>
        </div>
    );
};

export default UserProfilePage;
