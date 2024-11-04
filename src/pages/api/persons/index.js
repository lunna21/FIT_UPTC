import getHandler from './get';
import postHandler from './post';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await getHandler(req, res);
            break;
        case 'POST':
            await postHandler(req, res);
            break;
        default:
            res.status(405).json({ error: 'Método no permitido' });
            break;
    }
}