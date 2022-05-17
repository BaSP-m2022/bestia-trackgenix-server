import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().lowercase().required(),
    password: Joi.string().alphanum().required(),
    active: Joi.boolean().required(),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
export default {
  validateCreate,
};
