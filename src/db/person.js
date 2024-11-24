const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// GET /api/persons?document_number=123456&document_type=CC
export async function getPersonByDocument(documentNumber) {
    try {
        const response = await fetch(`/api/persons?document_number=${documentNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json() 
            throw error;
        }

        return response.json()
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error.message;
    }
}

export async function addPerson(formData) {
    try {
        const personData = {
            document_number_person: formData.numberDocument,
            id_document_type: formData.typeDocument,
            first_name_person: formData.firstName,
            last_name_person: formData.lastName,
            phone_number_person: formData.phoneNumber,
            birthdate_person: formData.birthDate,
            created_person_by: 1, // Assuming 'system' or replace with actual user
        };

        const response = await fetch('/api/persons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': BASE_URL + '/register',
            },
            body: JSON.stringify(personData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return response.json();
    } catch (error) {
        console.error('Error adding person:', error);
        throw error.message;
    }
}

export async function deletePersonByDocumentNumber(documnetNumber) {
    try {
        const response = await fetch(`/api/persons?document_number=${documnetNumber}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Referer': BASE_URL + '/register',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw (errorData || 'Error al borrar la persona');
        }
    } catch (error) {
        console.error('Error deleting person:', error);
        throw error.message;
    }
}