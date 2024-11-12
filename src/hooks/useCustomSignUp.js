import { useState } from 'react';
import { addPerson, deletePersonByDocumentNumber, getPersonByDocument } from '@/db/person';
import { addUserStudent, deleteUser, addUserWithRole, addUserInClerk } from '@/db/user';
import { uploadPdf } from '@/db/upload';

import useClerkSignUp from '@/hooks/useClerkSignUp';
import { sendEmail } from '@/db/email';

import { generatePassword } from '@/utils/utils';

const useCustomSignUp = () => {
    const { handleSignUp, isLoaded } = useClerkSignUp();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async ({ formData }) => {
        setIsLoading(true);
        setError(null);
        let user;
        let person;

        try {
            person = await getPersonByDocument(formData.document_number_person);

            if (person.length < 1 || !person) {
                console.log("Entro a crear persona")
                person = await addPerson(formData);
            }

            console.log(person)

            const password = generatePassword();
            formData.password = password;

            user = await addUserWithRole({
                ...formData,
                id_person: person.id_person,
            })

            const username = user.user.name_user;
            const email = user.user.email_user;

            const userClerk = await addUserInClerk({
                email: email,
                password: password,
                username: username,
            });

            console.log("user clerk: ", userClerk)

            // const urlToRedirect = `${process.env.NEXT_PUBLIC_BASE_URL}/verification/sign-in?token=${userClerk?.token?.token}`;

            // await sendEmail({
            //     email: email,
            //     subject: 'Bienvenido al UPTC FIT',
            //     text: `Hola ${formData.firstName} ${formData.lastName},\n\nPuedes iniciar sesión haciendo clic en el siguiente enlace: ${urlToRedirect}\n\nSi el inicio de sesión no se hace automático, puedes ingresar con las siguientes credenciales:\nUsuario: **${username}**\nContraseña: **${password}**\n\nSaludos,\nUPTC FIT`,
            //     html: `<p>Hola ${formData.firstName} ${formData.lastName},</p><p>Puedes iniciar sesión haciendo clic en el siguiente enlace: <a href="${urlToRedirect}">Iniciar Sesión</a></p><p>Si el inicio de sesión no se hace automático, puedes ingresar con las siguientes credenciales:</p><p>Usuario: <strong>${username}</strong></p><p>Contraseña: <strong>${password}</strong></p><p>Saludos,</p><p>UPTC FIT</p>`,
            // });

            const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;

            await sendEmail({
                email: email,
                subject: 'Bienvenido a UPTC FIT',
                text: `Hola ${formData.firstName} ${formData.lastName},\n\nPor favor, ve a iniciar sesión haciendo clic en el siguiente enlace: ${redirectUrl}\n\nPuedes ingresar con las siguientes credenciales:\nUsuario: **${username}**\nContraseña: **${password}**\n\nSi no solicitaste este mensaje, por favor responde a este correo.\n\nSaludos,\nUPTC FIT`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #FFCC29; padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
        <h1 style="color: #333; font-size: 24px; margin: 0;">Bienvenido a UPTC FIT</h1>
    </div>

    <!-- Content -->
    <div style="padding: 20px; background-color: #fff;">
        <p style="margin: 0 0 15px;">Hola <strong>${formData.firstName} ${formData.lastName}</strong>,</p>
        <p style="margin: 0 0 15px;">Por favor, ve a iniciar sesión haciendo clic en el siguiente enlace:</p>
        <p style="margin: 0 0 20px; text-align: center;">
            <a href="${redirectUrl}" style="display: inline-block; background-color: #FFCC29; color: #333; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px;">
                Iniciar Sesión
            </a>
        </p>
        <p style="margin: 0 0 15px;">Puedes ingresar con las siguientes credenciales:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Usuario:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${username}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Contraseña:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${password}</td>
            </tr>
        </table>
        <p style="margin: 0 0 15px;">Si no solicitaste este mensaje, por favor responde a este correo.</p>
        <p style="margin: 0;">Saludos,</p>
        <p style="margin: 0; font-weight: bold;">UPTC FIT</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p style="margin: 0;">UPTC FIT - Todos los derechos reservados</p>
    </div>
</div>

                `,
            });


            setIsLoading(false);
        } catch (err) {
            console.error('Error during register process:', err);
            setError(err);
            console.log(user);
            if (user?.user) {
                await deleteUser(user.user.id_user);
            }

            if (formData.firstName && formData.lastName && person) {
                await deletePersonByDocumentNumber(formData.document_number_person);
            }

            setIsLoading(false);
        }
    }

    const signUp = async ({ formData, file64Consent }) => {
        setIsLoading(true);
        setError(null);
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
            setError(err);
            setIsLoading(false);
        }
    }

    return {
        signUp,
        registerUser,
        isLoading,
        error,
        isLoaded,
    };
};

export default useCustomSignUp;