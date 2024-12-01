export async function getTurns() {
    try {
        const response = await fetch('/api/turns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const turns = await response.json();
        const formattedTurns = turns.reduce((acc, turn) => {
            const day = turn.day.toLowerCase();
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push({
                idTurn: turn.idTurn,
                maxCapacity: turn.maxCapacity,
                day: turn.day,
                status: turn.status,
                colorTurn: turn.colorTurn,
                startTime: turn.startTime,
                endTime: turn.endTime,
                createdTurnAt: turn.createdTurnAt,
                updatedTurnAt: turn.updatedTurnAt
            });
            return acc;
        }, {});

        return formattedTurns;
    } catch (error) {
        console.error('Failed to fetch turns:', error);
        throw error.message;
    }
}

export async function getTurnByDay(day) {
    try {
        const response = await fetch(`/api/turns?day=${day}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const turns = await response.json();

        let formattedTurns = turns.map(turn => ({
            idTurn: turn.idTurn,
            maxCapacity: turn.maxCapacity,
            status: turn.status,
            day: turn.day,
            colorTurn: turn.colorTurn,
            startTime: turn.startTime,
            endTime: turn.endTime,
            createdTurnAt: turn.createdTurnAt,
            updatedTurnAt: turn.updatedTurnAt
        }))

        const sortedTurns = formattedTurns.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.startTime}Z`);
            const timeB = new Date(`1970-01-01T${b.startTime}Z`);
            return timeA - timeB;
        });

        formattedTurns = sortedTurns.map((turn, index) => ({
            ...turn,
            countTurn: index + 1,
            isLast: index === sortedTurns.length - 1
        }));

        return formattedTurns;

    } catch (error) {
        console.error('Failed to fetch turns by day:', error);
        throw error.message;
    }
}

// retorna el turno actual y el siguiente turno
export async function getTurnsByHourOfDay(day, hour) {
    try {
        const turns = await getTurnByDay(day);

        const targetTime = new Date(`1970-01-01T${hour}Z`);

        const actualTurn = turns.find(turn => {
            const startTime = new Date(`1970-01-01T${turn.startTime}Z`);
            const endTime = new Date(`1970-01-01T${turn.endTime}Z`);
            return targetTime >= startTime && targetTime <= endTime;
        });

        const nextTurn = turns.find(turn => {
            const startTime = new Date(`1970-01-01T${turn.startTime}Z`);
            return startTime > targetTime;
        });

        return {
            actualTurn,
            nextTurn: nextTurn || null
        };
    } catch (error) {
        console.error('Failed to fetch turn by hour of day:', error);
        throw error;
    }
}


export async function deleteTurn(idTurn) {
    try {
        const response = await fetch(`/api/turns/${idTurn}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to delete turn:', error);
        throw error.message;
    }
}

export async function createTurn(turn) {
    const formattedTurn = {
        max_capacity: turn.maxCapacity,
        day: turn.day,
        start_time: turn.startTime,
        end_time: turn.endTime,
        color_turn: turn.colorTurn,
        status: turn.status === '' ? 'BLOCK' : turn.status
    };

    try {
        const response = await fetch('/api/turns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedTurn)
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        const formattedData = {
            idTurn: data.idTurn,
            maxCapacity: data.maxCapacity,
            day: data.day,
            status: data.status,
            colorTurn: data.colorTurn,
            startTime: data.startTime,
            endTime: data.endTime,
            createdTurnAt: data.createdTurnAt,
            updatedTurnAt: data.updatedTurnAt
        };

        return formattedData;
    } catch (error) {
        console.error('Failed to create turn:', error);
        throw error.message;
    }
}