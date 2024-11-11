import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const useClerkSignUp = () => {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();

    const handleSignUp = async ({
        email,
        password,
        username,
    }) => {
        if (!isLoaded) return;

        try {
            // Crea un nuevo usuario con role
            await signUp.create({
                emailAddress: email,
                password: password,
                username: username,
            });

            // Envía el enlace de verificación de email
            await signUp.prepareEmailAddressVerification({
                strategy: "email_link",
                redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
            });

            // Redirecciona a la página de espera para que el usuario confirme el email
            router.push("/verification");
        } catch (error) {
            console.error('Error during sign up process:', error);
            throw 'Error en el proceso de inicio de sesión: ' + error.message;
        }
    }

    return {
        handleSignUp,
        isLoaded,
    }
}

export default useClerkSignUp;