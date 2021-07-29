/* eslint-disable no-unused-vars */
import Joi from 'joi';

const commentValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    message: Joi.string().min(10).required(),
  });
  const options = { abortEarly: false };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).send({ message: 'Invalid inputs' });
  }
  next();
};

export default commentValidation;
