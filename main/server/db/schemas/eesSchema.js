import Joi from 'joi';

export const eesSchema = Joi.object().keys({
  type: Joi.string().required().error(new Error(`Type is required and should be a string!`)),
  count_type: Joi.string()
    .valid('auto', 'manual')
    .required()
    .error(new Error(`Count type is required and should be a string`)),
  symbol: Joi.string().required().error(new Error(`Symbol is required and should be a string`)),
  percent: Joi.number().required().error(new Error(`Percent is required and should be a string`)),
  description: Joi.string()
    .required()
    .error(new Error(`Description is required and should be a string`)),
});

// As custom errors seem not to work with react hook forms Joi.resolver, out of the box
export const eesFormSchema = Joi.object().keys({
  type: Joi.string().required(),
  count_type: Joi.string().valid('auto', 'manual').required(),
  symbol: Joi.string().required(),
  percent: Joi.number().required(),
  description: Joi.string().required(),
});
