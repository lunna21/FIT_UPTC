const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUserById(id, url) {
    console.log('getUserById', id, BASE_URL + url);

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Referer': BASE_URL + url,
            },
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
    
} 