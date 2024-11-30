export async function getSchedules(date) {
    try {
        const response = await fetch(`/api/schedules?date=${date}`, {
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

        const schedules = await response.json();

        const formattedSchedules = schedules.map(schedule => ({
            ...schedule,
            dateSchedule: schedule.date_schedule,
            idStudent: schedule.id_student,
            idTurn: schedule.id_turn,
            stateSchedule: schedule.state_schedule
        }));

        return formattedSchedules;
    } catch (error) {
        console.error('Failed to fetch schedules:', error);
        throw error.message;
    }
}

export async function createSchedule(schedule) {
    const formattedSchedule = {
        date_schedule: schedule.dateSchedule,
        id_student: schedule.idStudent,
        id_turn: schedule.idTurn,
        state_schedule: schedule.stateSchedule || 'PENDING'
    };

    try {
        const response = await fetch('/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedSchedule)
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        const formattedData = {
            ...data,
            dateSchedule: data.date_schedule,
            idStudent: data.id_student,
            idTurn: data.id_turn,
            stateSchedule: data.state_schedule
        };

        return formattedData;
    } catch (error) {
        console.error('Failed to create schedule:', error);
        throw error.message;
    }
}

export async function updateSchedule({idSchedule, stateSchedule}) {
    const formattedSchedule = {
        id_schedule: idSchedule,
        state_schedule: stateSchedule
    };

    try {
        const response = await fetch(`/api/schedules/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedSchedule)
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();

        const formattedData = {
            ...data,
            dateSchedule: data.date_schedule,
            idStudent: data.id_student,
            idTurn: data.id_turn,
            stateSchedule: data.state_schedule
        };

        return formattedData;
    } catch (error) {
        console.error('Failed to update schedule:', error);
        throw error.message;
    }
}