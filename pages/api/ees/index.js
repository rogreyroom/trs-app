import { GET_ALL_EES_DATA } from '../../../lib/db/actions/read'
import { ADD_EES_DATA } from '../../../lib/db/actions/add'

export default async function getEss(req, res) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const data = await GET_ALL_EES_DATA()
        res.status(200).json(data)
      } catch(error) {
        res.status(500).json({message: 'No data to be displayed!'})
      }
      break
    case 'POST':
      try {
        await ADD_EES_DATA(req.body)
        res.status(200).json({message: 'Data was added!'})
      } catch (error) {
        res.status(500).json(`${error}`)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}