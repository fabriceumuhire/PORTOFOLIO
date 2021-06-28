import Joi from 'joi';

const articleValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(10).max(50).required(),
    message: Joi.string().min(20).required(),
  });
  const options = { abortEarly: false };
  const {error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).send({ message: 'Invalid inputs'});
  }
  next();
};

export default articleValidation;
