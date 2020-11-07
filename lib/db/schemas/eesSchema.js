import Joi from '@hapi/joi';

export const eesSchema = Joi.object().keys({
	type: Joi.string().required().error(new Error(`Type is required and should be a string!`)),
	count_type: Joi.string().required().error(new Error(`Count type is required and should be a string`)),
	symbol: Joi.string().required().error(new Error(`Symbol is required and should be a string`)),
	percent: Joi.number().required().error(new Error(`Percent is required and should be a string`)),
	percent_range: Joi.string().error(new Error(`Percent range should be a string`)),
	description: Joi.string().required().error(new Error(`Description is required and should be a string`))
})
