import {GET_EES_DATA_BY_ID} from '../db/actions/read';
import {UPDATE_EES_DATA} from '../db/actions/update';

export default async function handleEesByIdRequest(req, res, next) {
  const method = req.method;
  const id = req.params.id;
  const value = req.body ? req.body.value : null;

  console.log('HANDLEEESBYIDREQUEST', method, id, value);

  switch (method) {
    case 'GET':
      try {
        const data = await GET_EES_DATA_BY_ID(id);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({message: 'No data to be displayed!'});
      }
      break;
    case 'PUT':
      try {
        const data = await UPDATE_EES_DATA(id, value);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({message: 'No data to be displayed!'});
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  next();
}
