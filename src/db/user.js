
export async function getUserById(id) {
    
    try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
    
} 