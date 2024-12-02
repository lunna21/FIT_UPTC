import nodemailer from 'nodemailer';

/**
 * @swagger
 * /api/send-email:
 *   post:
 *     summary: Enviar un correo electrónico
 *     description: Enviar un correo electrónico utilizando el servicio SMTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Dirección de correo del destinatario
 *                 example: ejemplo@dominio.com
 *               subject:
 *                 type: string
 *                 description: Asunto del correo
 *                 example: Asunto del correo
 *               text:
 *                 type: string
 *                 description: Texto sin formato del correo
 *                 example: Este es el contenido del correo en texto plano.
 *               html:
 *                 type: string
 *                 description: Contenido HTML del correo
 *                 example: <p>Este es el contenido del correo en HTML.</p>
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correo enviado correctamente
 *       405:
 *         description: Método no permitido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Only POST requests allowed
 *       500:
 *         description: Error al enviar el correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al enviar el correo
 */
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
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
}
