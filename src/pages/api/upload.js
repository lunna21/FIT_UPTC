import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { file, studentCode } = req.body;

        if (!studentCode) {
            return res.status(400).json({ message: 'Student code is required.' });
        }

        // Decode the base64 file
        const base64Data = file.replace(/^data:application\/pdf;base64,/, "");

        // Get the current date and format it as YYYYMMDD
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

        // Create the file name with student code and date
        const fileName = `${studentCode}_${formattedDate}.pdf`;
        const filePath = path.join(process.cwd(), 'public', 'consents', fileName);

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed.' });
            }
            res.status(200).json({ message: 'File uploaded successfully.', fileName });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}