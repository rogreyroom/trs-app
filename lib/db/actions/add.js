import { eesDB, employeesDB } from '../connection'
import { eesSchema, employeesSchema } from '../schemas'
import { validateDataAgainstSchema } from '../schemas/validator'

export const ADD_EES_DATA = async data => {
	const { value, error } = await validateDataAgainstSchema(data, eesSchema)
	if (error) throw error

	return await eesDB.asyncInsert( value )
};

export const ADD_EMPLOYEES_DATA = async data => {
	const { value, error } = await validateDataAgainstSchema(data, employeesSchema)
	if (error) throw error

	return await employeesDB.asyncInsert( value )
};

