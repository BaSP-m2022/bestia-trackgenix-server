import Joi from 'joi';

const validationCreateProject = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).max(100),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now'),
    clientName: Joi.string().min(3).required(),
    state: Joi.string().valid('active', 'inactive'),
    employees: Joi.string().min(3).max(30).required(),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validationUpdate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string().min(10).max(100),
    startDate: Joi.date().less('now'),
    endDate: Joi.date().greater('now'),
    clientName: Joi.string().min(3),
    state: Joi.string().valid('active', 'inactive'),
    employees: Joi.string().min(3).max(30).required(),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validationCreateProject,
  validationUpdate,
};