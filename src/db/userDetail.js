export async function getUserDetail(id) {
    try {
        const response = await fetch(`/api/user/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return response.json();
        } else {
            console.error('Error fetching user detail:', response);
            throw "Error al obtener los detalles del usuario";
        }
    } catch (error) {
        console.error('Error fetching user detail:', error);
        throw error;
    }
}
