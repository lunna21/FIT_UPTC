import postHandler from './post';
import getHandler from './get';
import putHandler from './put';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      console.log('GET');
      await getHandler(req, res);
      break;
    case 'POST':
      await postHandler(req, res);
      break;
    case 'PUT':
      await putHandler(req, res);
      break;
    default:
      res.status(405).json({ error: 'Método no permitido' });
      break;
  }
}