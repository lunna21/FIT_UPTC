import { toCapitalize } from "@/utils/utils";

function emailCredential({ firstName, lastName, username, password, redirectUrl }) {

    if(!firstName || !lastName || !username || !password || !redirectUrl) {
        console.error('Missing required fields');
        return null
    }

    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background-color: #FFCC29; padding: 20px; text-align: center; border-bottom: 1px solid #ddd;">
        <h1 style="color: #333; font-size: 24px; margin: 0;">Bienvenido a UPTC FIT</h1>
    </div>

    <!-- Content -->
    <div style="padding: 20px; background-color: #fff;">
        <p style="margin: 0 0 15px;">Hola <strong>${toCapitalize(firstName + " " + lastName)}</strong>,</p>
        <p style="margin: 0 0 15px;">Por favor, ve a iniciar sesión haciendo clic en el siguiente enlace:</p>
        <p style="margin: 0 0 20px; text-align: center;">
            <a href="${redirectUrl}" style="display: inline-block; background-color: #FFCC29; color: #333; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px;">
                Iniciar Sesión
            </a>
        </p>
        <p style="margin: 0 0 15px;">Puedes ingresar con las siguientes credenciales:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Usuario:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${username}</td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">Contraseña:</td>
                <td style="padding: 8px; background-color: #f9f9f9;">${password}</td>
            </tr>
        </table>
        <p style="margin: 0 0 15px;">Si no solicitaste este mensaje, por favor responde a este correo.</p>
        <p style="margin: 0;">Saludos,</p>
        <p style="margin: 0; font-weight: bold;">UPTC FIT</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p style="margin: 0;">UPTC FIT - Todos los derechos reservados</p>
    </div>
</div>
    `
}

export default emailCredential;