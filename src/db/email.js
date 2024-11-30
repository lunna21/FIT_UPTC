

export const sendEmail = async ({email, subject, text='', html}) => {
    try {

        // create structure html
        const newHtml = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                        }
                        h1 {
                            color: #333;
                        }
                    </style>
                </head>
                <body>
                    <h1>${subject}</h1>
                    <p>${text}</p>
                </body>
            </html>
        `;

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: email, subject, text, html: html || newHtml }),
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error('Error sending email:', error);
        throw error.message || 'Error sending email';
    }
}