import { GET_EMPLOYEE_DATA_BY_ID } from '@/lib/db/actions/read'
import { ADD_EMPLOYEE_RTS_DATA } from '@/lib/db/actions/add'
import {
  UPDATE_EMPLOYEE_JUVENILE_STATUS,
  UPDATE_EMPLOYEE_TERMINATION_DATE,
  UPDATE_EMPLOYEE_HOLIDAY_DATES,
  REMOVE_EMPLOYEE_HOLIDAY_DATES,
  UPDATE_EMPLOYEE_SICK_DATES,
  REMOVE_EMPLOYEE_SICK_DATES,
  UPDATE_EMPLOYEE_OTHER_LEAVE_DATES,
  REMOVE_EMPLOYEE_OTHER_LEAVE_DATES,
  UPDATE_EMPLOYEE_RTS_DATA,
  UPDATE_BASIC_EMPLOYEE_INFO,
  UPDATE_EMPLOYEE_MONTHLY_RATES } from '@/lib/db/actions/update'


export default async function handleEmployeeByIdRequest(req, res) {
  const {
    query: { id },
    body: { field, queryFields, value },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const data = await GET_EMPLOYEE_DATA_BY_ID(id)
        res.status(200).json(data)
      } catch(error) {
        res.status(500).json({message: 'No data to be displayed!'})
      }
      break
    case 'PUT':
      try {
        switch (field) {
          case 'juvenile':
            const juvenileData =  await UPDATE_EMPLOYEE_JUVENILE_STATUS(id, value)
            res.status(200).json(juvenileData)
            break
          case 'termination':
            const Data =  await UPDATE_EMPLOYEE_TERMINATION_DATE(id, value)
            res.status(200).json(Data)
            break
          case 'holiday':
            const holidayData =  await UPDATE_EMPLOYEE_HOLIDAY_DATES(id, queryFields, value)
            res.status(200).json(holidayData)
            break
          case 'deleteHoliday':
            const removeHolidayData =  await REMOVE_EMPLOYEE_HOLIDAY_DATES(id, queryFields, value)
            res.status(200).json(removeHolidayData)
            break
          case 'sick':
            const sickData =  await UPDATE_EMPLOYEE_SICK_DATES(id, queryFields, value)
            res.status(200).json(sickData)
            break
          case 'deleteSick':
            const removeSickData =  await REMOVE_EMPLOYEE_SICK_DATES(id, queryFields, value)
            res.status(200).json(removeSickData)
            break
          case 'other':
            const otherData =  await UPDATE_EMPLOYEE_OTHER_LEAVE_DATES(id, queryFields, value)
            res.status(200).json(otherData)
            break
          case 'deleteOther':
            const removeOtherData =  await REMOVE_EMPLOYEE_OTHER_LEAVE_DATES(id, queryFields, value)
            res.status(200).json(removeOtherData)
            break
          case 'add_rts':
            const addRtsData =  await ADD_EMPLOYEE_RTS_DATA(id, queryFields, value)
            res.status(200).json(addRtsData)
            break
          case 'update_rts':
            const updateRtsData =  await UPDATE_EMPLOYEE_RTS_DATA(id, queryFields, value)
            res.status(200).json(updateRtsData)
            break
          case 'calendar':
            const calendarData =  await UPDATE_EMPLOYEE_MONTHLY_RATES(id, value)
            res.status(200).json(calendarData)
            break
          case 'employee':
            const employeeData =  await UPDATE_BASIC_EMPLOYEE_INFO(id, value)
            console.log('API employee', value);
            res.status(200).json(employeeData)
            break
          default:
            res.status(204).end(`No data found!`)
        }
      } catch(error) {
        console.error('END Error', error);
        res.status(500).json({message: 'No data to be displayed!'})
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}