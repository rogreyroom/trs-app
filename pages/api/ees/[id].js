import { GET_EES_DATA_BY_ID } from '../../../lib/db/actions/read'


export default async function getEesById(req, res) {
  const {
    query: { id },
  } = req

  try {
    const data = await GET_EES_DATA_BY_ID(id)
    res.status(200).json(data)
  } catch(error) {
    res.status(500).json({message: 'No data to be displayed!'})
  }
}
