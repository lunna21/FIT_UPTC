export async function getFeedbacks() {
    try {
        const response = await fetch('/api/feedbacks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('error', error);
            throw error;
        }

        const feedbacks = await response.json();
        return feedbacks;
    } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
        throw error.message;
    }
}

export async function createFeedback(feedback) {
    const { id_user, rating, comment } = feedback;

    if (!id_user) {
        throw ('El id del usuario es requerido');
    }

    if (!rating) {
        throw ('La puntuación es requerida');
    }

    if (rating < 1 || rating > 5) {
        throw ('La puntuación debe ser un valor entre 1 y 5');
    }

    if (comment && comment.length > 200) {
        throw ('El comentario no puede tener más de 200 caracteres');
    }

    try {
        const response = await fetch('/api/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user, rating, comment })
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create feedback:', error);
        throw error.message;
    }
}

export async function getFeedbacksByUser(id_user) {
    try {
        const response = await fetch(`/api/feedbacks?id_user=${id_user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('error', error);
            throw error;
        }

        const feedbacks = await response.json();
        return feedbacks;
    } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
        throw error.message;
    }
}

export async function getLastFeedBackByUser(id_user) {
    try {
        const feedbacks = await getFeedbacksByUser(id_user);
        if (feedbacks.length === 0) {
            return false;
        }
        const lastFeedback = feedbacks.reduce((latest, feedback) => {
            return new Date(feedback.created_at) > new Date(latest.created_at) ? feedback : latest;
        }, feedbacks[0]);
        return lastFeedback;
    } catch (error) {
        console.error('Failed to fetch last feedback:', error);
        throw error;
    }
}