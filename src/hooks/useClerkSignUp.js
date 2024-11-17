import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const useClerkSignUp = () => {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();

    const handleSignUp = async ({
        email,
        password,
        username,
        redirect = true,
    }) => {
        if (!isLoaded) return;

        console.log('SignUp Data:', { email, password, username });
        
        try {
            // Crea un nuevo usuario con role
            try {
                await signUp.create({
                    emailAddress: email,
                    password: password,
                    username: username,
                });
            } catch (error) {
                console.error('SignUp Error Details:', error);
                throw new Error(`SignUp failed: ${error.errors?.map(err => err.message).join(', ') || error.message}`);
            }

            // Envía el enlace de verificación de email
            await signUp.prepareEmailAddressVerification({
                strategy: "email_link",
                redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/create-password`,
            });

            // Redirecciona a la página de espera para que el usuario confirme el email
            if (redirect)
                router.push("/verification");
        } catch (error) {
            console.error('Error during sign up process:', error);
            throw 'Error en el proceso de inicio: ' + error.message;
        }
    }

    return {
        handleSignUp,
        isLoaded,
    }
}

export default useClerkSignUp;