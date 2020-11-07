import Joi from '@hapi/joi';

export const employeesSchema = Joi.object().keys({
  name: Joi.string().required().error(new Error(`Name is required and should be a string!`))
})