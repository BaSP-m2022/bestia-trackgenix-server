import Joi from 'joi';

const validateEmployee = async (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30)
      .required(),
    lastName: Joi.string().min(3).max(30)
      .required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    active: Joi.boolean().required(),
  });
  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
const validateMod = async (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    phone: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30),
    active: Joi.boolean(),
  });
  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};
export default {
  validateEmployee,
  validateMod,
};
