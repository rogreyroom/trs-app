import {GET_PUBLIC_HOLIDAYS_DATA_BY_YEAR} from '../db/actions/read';
import {ADD_PUBLIC_HOLIDAYS_DATA} from '../db/actions/add';

export default async function handlePublicHolidaysRequest(req, res, next) {
  const {method} = req;
  const {year} = req.params;
  const value = req.body ? req.body : null;

  switch (method) {
    case 'GET':
      try {
        const data = await GET_PUBLIC_HOLIDAYS_DATA_BY_YEAR(parseInt(year, 10));
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({message: 'No data to be displayed!'});
      }
      break;
    case 'POST':
      try {
        await ADD_PUBLIC_HOLIDAYS_DATA(value);
        res.status(200).json({message: 'Data was added!'});
      } catch (error) {
        res.status(500).json(`${error}`);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  next();
}
