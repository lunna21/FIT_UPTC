import getHandler from './getAllUsersDetails';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;
    default:
      res.status(405).json({ message: 'Método no permitido' });
      break;
  }
}