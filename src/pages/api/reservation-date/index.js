import updateReservationDateHandler from './put'
import getReservationDateHandler from './get'

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await getReservationDateHandler(req, res);
            break;
        case 'PUT':
            await updateReservationDateHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}