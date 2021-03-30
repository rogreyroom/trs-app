import bcrypt from 'bcrypt';
import {GET_USER} from '../db/actions/read';

export default async function handleUserCredentialsRequest(req, res, next) {
  const {method} = req;
  const user = req.body;

  switch (method) {
    case 'POST':
      try {
        const data = await GET_USER(user.name);
        if (data === null) return res.status(403).json({message: 'Nieprawidłowy login lub hasło!'});
        bcrypt.compare(user.password, data.passwordHash, (err, result) => {
          if (!result) return res.status(401).json({message: 'Nieprawidłowy login lub hasło!'});
          return res.status(200).json({message: `Witaj, ${data.fullName}`});
        });
      } catch (error) {
        res.status(500).json({message: 'No data to be displayed!'});
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
