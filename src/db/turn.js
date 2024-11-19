export async function getTurns() {
    try {
        const response = await fetch('/api/turns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
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
        throw error;
    }
}