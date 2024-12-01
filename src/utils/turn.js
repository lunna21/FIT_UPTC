export const calculateTopPosition = ({turn, containerHeight, startTimeAttention, timeAttention}) => {
    const { startTime } = turn;
    // Suponiendo que startTime es un string en formato "HH:MM"
    if(!startTime) {
        return 0;
    }
    const [hours, minutes] = startTime.split(':').map(Number);
    const adjust = (hours - startTimeAttention) * 3;
    const totalMinutes = (hours - startTimeAttention) * 60 + minutes;
    const top = (totalMinutes / (timeAttention * 60)) * containerHeight;
    return top - adjust;
};

export const calculateHeightCard = ({ startTime, endTime, containerHeight, startTimeAttention, timeAttention }) => {
    if (!startTime || !endTime) {
        return 0;
    }

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const adjust = (endHours - startTimeAttention) * 0.5;

    const startTotalMinutes = (startHours * 60) + startMinutes;
    const endTotalMinutes = (endHours * 60) + endMinutes;

    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const height = (durationMinutes / (timeAttention * 60)) * containerHeight;

    return height - adjust;
}