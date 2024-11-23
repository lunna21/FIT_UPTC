import deleteHandler from './delete'

export default async function handler(req, res) {

    switch (req.method) {
        case 'DELETE':
            deleteHandler(req, res);
            break;
        default:
            res.status(405).json({ error: 'Método no permitido' });
            break;
    }
}