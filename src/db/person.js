const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function addPerson(formData) {
    try {
        const personData = {
            document_number_person: formData.numberDocument,
            id_document_type: formData.typeDocument,
            first_name_person: formData.firstName,
            last_name_person: formData.lastName,
            phone_number_person: formData.phoneNumber,
            email_person: formData.email,
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

        if (response.ok) {
            return response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error adding person');
        }
    } catch (error) {
        console.error('Error adding person:', error);
        throw error;
    }
}

export async function deletePerson(id) {
    try {
        const response = await fetch(`/api/persons/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Referer': BASE_URL + '/register',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error deleting person');
        }
    } catch (error) {
        console.error('Error deleting person:', error);
        throw error;
    }
}