import { error } from 'console';
import { writeFile, mkdirSync } from 'fs';
import { join } from 'path';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { studentCode, base64Data } = req.body;

            if (!studentCode || !base64Data) {
                return res.status(400).json({ error: 'Missing studentCode or base64Data in request body.' });
            }

            // Get the current date and format it as YYYYMMDD
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

            // Create the file name with student code and date
            const fileName = `${studentCode}_${formattedDate}.pdf`;
            const filePath = join(process.cwd(), 'public', 'consents', fileName);

            // Ensure the directory exists
            mkdirSync(join(process.cwd(), 'public', 'consents'), { recursive: true });

            console.log(`Writing file to ${filePath}`);

            writeFile(filePath, base64Data, 'base64', (err) => {
                if (err) {
                    console.error('File write error:', err);
                    return res.status(500).json({ error: 'File upload failed.' });
                }
                console.log('File uploaded successfully');
                return res.status(201).json({ message: 'File uploaded successfully.', fileName, filePath });
            });
        } catch (error) {
            console.error('Error handling request:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;