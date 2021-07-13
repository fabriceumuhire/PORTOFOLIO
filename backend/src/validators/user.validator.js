/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const options = { abortEarly: false };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(402).send({ message: 'Invalid inputs' });
  }
  next();
};
