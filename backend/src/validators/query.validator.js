import Joi from 'joi';

const articleValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(10).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(10).max(50).required(),
    message: Joi.string().min(20).required(),
  });
  return schema.validate(data);
};

export default articleValidation;
