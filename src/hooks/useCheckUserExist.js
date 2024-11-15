import { useState } from 'react';
import { getPersonByDocument } from '@/db/person';

const useCheckUserExist = () => {
    const [isLoadingVerification, setIsLoadingVerification] = useState(false);
    const [errorCheck, setErrorCheck] = useState('');

    const checkPersonByDocument = async ({ documentNumber, setIsValidated }) => {
        setIsLoadingVerification(true);

        try {
            if(!documentNumber) {
                setIsLoadingVerification(false);
                setErrorCheck('Debe completar los campos');
                setIsValidated('no');
                return null;
            }
            const person = await getPersonByDocument(documentNumber);

            if(!person) {
                setIsLoadingVerification(false);
                setErrorCheck('');
                setIsValidated('yes');
                return null;
            }

            if (person.document_number_person === documentNumber) {
                setIsValidated('no');
                setErrorCheck("El usuario ya existe");
                setIsLoadingVerification(false);
            }

        } catch (error) {
            setIsLoadingVerification(false);
            setErrorCheck('Error al verificar el usuario');
            setIsValidated('yes');
            console.error(error)
            return null;
        }
    };

    return {
        checkPersonByDocument,
        isLoadingVerification,
        errorCheck,
    }
}

export default useCheckUserExist;