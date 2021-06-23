/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};
