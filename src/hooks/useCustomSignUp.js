import { useState } from 'react';
import { useSession } from '@clerk/nextjs';
import { addPerson, deletePersonByDocumentNumber, getPersonByDocument } from '@/db/person';
import { addUserStudent, deleteUser, addUserWithRole, addUserInClerk } from '@/db/user';
import { uploadPdf } from '@/db/upload';

import useClerkSignUp from '@/hooks/useClerkSignUp';
import { sendEmail } from '@/db/email';

import { generatePassword } from '@/utils/utils';

import emailCredential from '@/emails/emailCredentials';

const useCustomSignUp = () => {
    const { handleSignUp, isLoaded } = useClerkSignUp();
    const [isLoading, setIsLoading] = useState(false);
    const { session } = useSession();

    const registerUser = async ({ formData }) => {
        if (!session) {
            console.error("No hay sesión activa en el cliente.");
            return; // Evita realizar acciones que dependan de la autenticación
        }
        setIsLoading(true);
        let user;
        let person;

        try {
            try {
                person = await getPersonByDocument(formData.numberDocument);
                if (!person) {
                    person = [];
                }
            } catch (err) {
                console.error(err);
                person = [];
            }

            if (person.length < 1 || !person) {
                person = await addPerson(formData);
            }

            const password = generatePassword();
            formData.password = password;

            user = await addUserWithRole({
                ...formData,
                id_person: person.id_person,
            })

            const username = user.user.name_user;
            const email = user.user.email_user;

            await addUserInClerk({
                email: email,
                password: password,
                username: username,
            });
            
            const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;

            await sendEmail({
                email: email,
                subject: 'Bienvenido a UPTC FIT',
                text: `Hola ${formData.firstName} ${formData.lastName},\n\nPor favor, ve a iniciar sesión haciendo clic en el siguiente enlace: ${redirectUrl}\n\nPuedes ingresar con las siguientes credenciales:\nUsuario: **${username}**\nContraseña: **${password}**\n\nSi no solicitaste este mensaje, por favor responde a este correo.\n\nSaludos,\nUPTC FIT`,
                html: emailCredential({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: username,
                    password: password,
                    redirectUrl: redirectUrl,
                }),
            });


            setIsLoading(false);
        } catch (err) {
            if (user?.user) {
                await deleteUser(user.user.id_user);
            }

            if (formData.firstName && formData.lastName && person) {
                await deletePersonByDocumentNumber(formData.numberDocument);
            }

            setIsLoading(false);

            throw err;
        }
    }

    const signUp = async ({ formData, file64Consent }) => {
        setIsLoading(true);
        let person;
        let user;

        try {
            // Step 1: Create the person
            person = await addPerson(formData);

            // Step 2: Upload File
            const base64Data = file64Consent;
            const studentCode = formData.studentCode;
            const formattedDate = new Date().toISOString();

            const { filePath } = await uploadPdf({
                base64File: base64Data,
                studentCode: studentCode,
                formattedDate: formattedDate,
            });

            // Step 0.2: add password_user to formData
            const newPassword = generatePassword();
            formData.password = newPassword;

            // Step 3: Create the user
            user = await addUserStudent({
                ...formData,
                id_person: person.id_person,
            }, filePath);

            const username = user.user.name_user;

            // Step 4: Use Clerk to sign up the user
            await handleSignUp({
                email: formData.email,
                password: newPassword,
                username: username,
            });

            setIsLoading(false);
        } catch (err) {
            // Rollback logic
            if (user) {
                // Delete the user if it was created
                await deleteUser(user.user.id_user);
            }
            if (person) {
                // Delete the person if it was created
                await deletePersonByDocumentNumber(person.document_number_person);
            }

            console.error('Error during signup process:', err);
            setIsLoading(false);
            throw err;
        }
    }

    return {
        signUp,
        registerUser,
        isLoading,
        isLoaded,
    };
};

export default useCustomSignUp;