import Joi from 'joi';

const validationCreateProject = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().min(10).max(100),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').optional(),
    clientName: Joi.string().required().min(3),
    state: Joi.string().valid('active', 'inactive'),
    employees: Joi.string().required().min(3),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validationCreateProject,
};
