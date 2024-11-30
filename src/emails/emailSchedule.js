export function emailCreateSchedule({ firstName, lastName, scheduleDate, startTime, endTime }) {

    if (!firstName || !lastName || !scheduleDate || !startTime || !endTime) {
        console.error('Missing required fields to send email "emailCreateSchedule"');
        return null;
    }

    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #FFCC29; padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
        <h1 style="color: #333; font-size: 24px; margin: 0;">Turno Agendado</h1>
    </div>

    <!-- Content -->
    <div style="padding: 20px; background-color: #fff;">
        <p style="margin: 0 0 15px;">Hola <strong>${firstName} ${lastName}</strong>,</p>
        <p style="margin: 0 0 15px;">Tu turno ha sido agendado satisfactoriamente ☺️</p>
        <p style="margin: 0 0 15px;">Detalles del turno:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Fecha:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${scheduleDate}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Hora de Inicio:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${startTime}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Hora de Fin:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${endTime}</td>
            </tr>
        </table>
        <p style="margin: 0 0 15px;">Si no solicitaste este mensaje, por favor responde a este correo.</p>
        <p style="margin: 0;">Saludos,</p>
        <p style="margin: 0; font-weight: bold; display: inline;">UPTC FIT</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p style="margin: 0;">UPTC FIT - Todos los derechos reservados ©</p>
    </div>
</div>
    `;
}

export function emailCancelSchedule({ firstName, lastName, scheduleDate }) {

    if (!firstName || !lastName || !scheduleDate ) {
        return null;
    }

    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #FFCC29; padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
        <h1 style="color: #333; font-size: 24px; margin: 0;">Turno Cancelado</h1>
    </div>

    <!-- Content -->
    <div style="padding: 20px; background-color: #fff;">
        <p style="margin: 0 0 15px;">Hola <strong>${firstName} ${lastName}</strong>,</p>
        <p style="margin: 0 0 15px;">Tu cancelación del turno para el día <strong>${scheduleDate}</strong> se ha realizado con exito.</p>
        <p style="margin: 0 0 15px;">Recuerda que en cualquier momento puedes reprogramar el turno 😜</p>
        <p style="margin: 0;">Saludos,</p>
        <p style="margin: 0; font-weight: bold;">UPTC FIT</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p style="margin: 0;">UPTC FIT - Todos los derechos reservados ©</p>
    </div>
</div>
    `;
}