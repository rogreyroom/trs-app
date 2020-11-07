import { eesDB } from '../connection'
import { eesSchema } from '../schemas/eesSchema'
import { validateDataAgainstSchema } from '../schemas/validator'

export const ADD_EES_DATA = async data => {
	const { value, error } = await validateDataAgainstSchema(data, eesSchema)
	if (error) throw error

	return await eesDB.asyncInsert( value )
};


