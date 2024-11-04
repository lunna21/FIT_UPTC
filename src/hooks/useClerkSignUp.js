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
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return {
        handleSignUp,
        isLoaded,
    }
}

export default useClerkSignUp;