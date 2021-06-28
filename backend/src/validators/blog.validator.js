/* eslint-disable no-unused-vars */
import Joi from 'joi';

const blogValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(10).required(),
    content: Joi.string().min(50).required(),
  });
  const options = { abortEarly: false };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).json({ message: 'Invalid inputs' });
  }
  next();
};

export default blogValidation;
