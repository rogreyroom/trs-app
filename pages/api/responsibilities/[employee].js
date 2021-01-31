import { GET_RESPONSIBILITIES_DATA_BY_EMPLOYEE } from '@/lib/db/actions/read'
import { ADD_RESPONSIBILITIES_DATA } from '@/lib/db/actions/add'
import { UPDATE_RESPONSIBILITIES_DATA } from '@/lib/db/actions/update'

export default async function handleResponsibilitiesByEmployeeRequest(req, res) {
  const {
    query: { employee },
    body,
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const data = await GET_RESPONSIBILITIES_DATA_BY_EMPLOYEE(employee)
        res.status(200).json(data)
      } catch(error) {
        res.status(500).json({message: 'No data to be displayed!'})
      }
      break
    case 'POST':
      try {
        await ADD_RESPONSIBILITIES_DATA(body)
        res.status(200).json({message: 'Data was added!'})
      } catch (error) {
        res.status(500).json(`${error}`)
      }
      break
    case 'PUT':
      await UPDATE_RESPONSIBILITIES_DATA(employee, body)
      res.status(200).json({message: 'Data was added!'})
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}