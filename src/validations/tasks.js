import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeePropSchema = Joi.object({
    employeeRole: Joi.string().valid('PM', 'TL', 'DEV', 'QA').required(),
    employeeName: Joi.string().min(3).max(50).required(),
  });
  const taskValidation = Joi.object({
    taskName: Joi.string().min(1).max(50).required(),
    taskDescription: Joi.string().min(1).max(250).optional(),
    assignedEmployee: Joi.array().items(employeePropSchema),
    startDate: Joi.date().required(),
    status: Joi.string(),
  });
  const validation = taskValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const updateTaskValidation = (req, res, next) => {
  const employeePropSchema = Joi.object({
    employeeRole: Joi.string().valid('PM', 'TL', 'DEV', 'QA').required(),
    employeeName: Joi.string().min(3).max(50).required(),
  });
  const taskValidation = Joi.object({
    parentProject: Joi.string().alphanum().required(),
    taskName: Joi.string().min(1).max(50).required(),
    taskDescription: Joi.string().min(1).max(250).optional(),
    assignedEmployee: Joi.array().items(employeePropSchema),
    startDate: Joi.date().required(),
    status: Joi.string(),
  });
  const validation = taskValidation.validate(req.body);
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
  validateCreation,
  updateTaskValidation,
};
