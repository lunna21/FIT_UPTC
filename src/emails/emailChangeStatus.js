const emailChangeStatus = ({status, firstName, lastName}) => {
    const statusString = status === 'ACT' ? 'Activo' : status === 'INA' ? 'Inactivo' : status === 'PEN' ? 'Pendiente' : null;

    if (!statusString) {
        console.error('Missing required fields to send email "emailChangeStatus"', status);
        return null;
    }

    return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
<!-- Header -->
<div style="background-color: #FFCC29; padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
    <h1 style="color: #333; font-size: 24px; margin: 0;">Cambio de Estado</h1>
</div>

<!-- Content -->
<div style="padding: 20px; background-color: #fff;">
    <p style="margin: 0 0 15px;">Hola <strong>${firstName} ${lastName}</strong>,</p>
    <p style="margin: 0 0 15px;">El estado de tu cuenta ha sido cambiado a: <strong>${statusString}</strong></p>
    <p style="margin: 0 0 15px;">Si no solicitaste este cambio, por favor responde a este correo.</p>
    <p style="margin: 0 0 15px;">Si tienes alguna duda sobre por qué se cambió tu estado, por favor acércate de manera presencial a nuestras oficinas.</p>
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

export default emailChangeStatus;