import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { to, subject, text, html } = req.body;

    try {
        // Configuración del transportador SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes usar otros como Outlook o SMTP personalizado
            auth: {
                user: 'diegofernandoaguirretenjo@gmail.com', // Hacer variable de entorno
                pass: 'gtui negl xjcr zrfd',    // Hacer variable de entorno
            },
        });

        // Opciones del correo
        const mailOptions = {
            from: 'diegofernandoaguirretenjo@gmail.com', // Remitente
            to: to,                      // Destinatario
            subject: subject,            // Asunto
            text: text,                  // Texto sin formato
            html: html,                  // Contenido en HTML
        };

        // Enviar correo
        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado: ${info.response}`);

        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error(`Error al enviar el correo: ${error.message}`);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
}
