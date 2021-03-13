export const validateDataAgainstSchema = (data, schema) => {
	return schema.validate(data, { abortEarly: true });
};