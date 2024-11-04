import { useState } from 'react';
import { addPerson, deletePerson } from '@/api/person';
import { addUserStudent, deleteUser } from '@/api/user';
import useClerkSignUp from '@/hooks/useClerkSignUp';

import { generatePassword } from '@/utils/utils';

const useCustomSignUp = () => {
    const { handleSignUp, isLoaded } = useClerkSignUp();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async (formData) => {
        setIsLoading(true);
        setError(null);
        let person;
        let user;

        try {
            // Step 1: Create the person
            person = await addPerson(formData);
            console.log(person);

            // Step 0.2: add password_user to formData
            formData.password_user = generatePassword();

            // Step 2: Create the user
            user = await addUserStudent({
                ...formData,
                id_person: person.id_person,
            });
            console.log(user);

            // Step 3: Use Clerk to sign up
            await handleSignUp({
                email: person.email_person,
                password: formData.password_user, // Assuming password is part of formData
                username: user.name_user,
            });

            setIsLoading(false);
        } catch (err) {
            // Rollback logic
            if (user) {
                // Delete the user if it was created
                await deleteUser(user.id_user);
            }
            if (person) {
                // Delete the person if it was created
                await deletePerson(person.document_number_person);
            }

            console.error('Error during signup process:', err);
            setError('Error durante el proceso de registro. Por favor, inténtelo de nuevo.');
            setIsLoading(false);
        }
    }

    return {
        signUp,
        isLoading,
        error,
        isLoaded,
    };
};

export default useCustomSignUp;