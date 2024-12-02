export async function updateReservationDate(id, daysAfter = 1) {
    let reservationDate = new Date();
    reservationDate.setDate(reservationDate.getDate() + daysAfter);

    // Convertir explícitamente la fecha a UTC-5
    const toUTCMinus5 = (date) => {
        const offsetMillis = 5 * 60 * 60 * 1000; // UTC-5 en milisegundos
        return new Date(date.getTime() - offsetMillis);
    };

    const adjustedDate = toUTCMinus5(reservationDate);
    
    try {
        const response = await fetch(`/api/reservation-date`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUser: id,
                newDate: adjustedDate
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update reservation date:', error);
        throw error.message;
    }
}

export async function getReservationDate() {
    try {
        const response = await fetch(`/api/reservation-date/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        if (data.length > 0) {
            return data[0];
        } else {
            return {};
        }
    } catch (error) {
        console.error('Failed to fetch reservation date:', error);
        throw error.message;
    }
}