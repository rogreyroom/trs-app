export const validateDataAgainstSchema = (data, schema) =>
  schema.validate(data, {abortEarly: true});
