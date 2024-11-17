
export const uploadPdf = async ({ base64File, studentCode, formattedDate }) => {
    const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64Data: base64File,
            studentCode: studentCode,
            uploadDate: formattedDate
        }),
    });

    if (!response.ok) {
        throw new Error('Error en la carga del archivo: ' + response.statusText);
    }

    return response.json()
}