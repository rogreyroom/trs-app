import { eesDB, employeesDB, responsibilitiesDB } from '../connection'
import { eesSchema, employeesSchema } from '../schemas'
import { validateDataAgainstSchema } from '../schemas/validator'

export const ADD_EES_DATA = async data => {
	const { value, error } = await validateDataAgainstSchema(data, eesSchema)
	if (error) throw error

	return await eesDB.asyncInsert( value )
};

export const ADD_EMPLOYEES_DATA = async data => {
	console.log('ADD_EMPLOYEES_DATA', data);
	// const { value, error } = await validateDataAgainstSchema(data, employeesSchema)
	// if (error) throw error

	const value = data
	console.log('validateDataAgainstSchema', value);

	return await employeesDB.asyncInsert( value )
};


export const ADD_RESPONSIBILITIES_DATA = async data => {
	console.log('ADD_RESPONSIBILITIES_DATA', data)
	const value = data
	return await responsibilitiesDB.asyncInsert( value )
}


export const ADD_EMPLOYEE_RTS_DATA = async (id, queryFields, data) => {
	console.log('UPDATE_EMPLOYEE_RTS_DATA', id, queryFields, data);
	const employee = await employeesDB.asyncFindOne({ _id: id	})
	const employeeYearIndex = employee.calendar.findIndex(year => year.year === queryFields.year)
	const employeeMonthIndex = employee.calendar.filter(year => year.year === queryFields.year)[0].months.findIndex(el => el.month === queryFields.month)

	console.log('employee', employee)
	console.log('employeeYearIndex', employeeYearIndex, 'employeeMonthIndex', employeeMonthIndex)
	console.log('To be push to: ', `calendar.${employeeYearIndex}.months.${employeeMonthIndex}.rts`)

	console.log('data', data);


	return await employeesDB.asyncUpdate({ _id: id }, { $push: { [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.rts`]: data }})

	// When editing rts date
	// const rtsDayIndex = employee.calendar.filter(year => year.year === queryFields.year)[0].months.filter(el => el.month === queryFields.month)[0].rts.findIndex(day => day.due_date === data.data.due_date)
	// return await employeesDB.asyncUpdate({ _id: id }, { $set: { [`calendar.${employeeYearIndex}.months.${employeeMonthIndex}.rts.${rtsDayIndex}`]: data.date }})

}


