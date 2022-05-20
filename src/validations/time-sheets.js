import Joi from 'joi';

const createTimeSheetValidation = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(1).max(100).required(),
    day: Joi.date().required(),
    role: Joi.string().required(),
    project: Joi.string().required(),
    task: Joi.string().required(),
    validated: Joi.boolean().required(),
    projectManager: Joi.string().required(),
  });
  const validation = timeSheetValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const updateTimeSheetValidation = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(1).max(100).required(),
    day: Joi.date().required(),
    role: Joi.string().required(),
    project: Joi.string().required(),
    task: Joi.string().required(),
    validated: Joi.boolean().required(),
    projectManager: Joi.string().required(),
  });
  const validation = timeSheetValidation.validate(req.body);
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
  createTimeSheetValidation, updateTimeSheetValidation,
};
