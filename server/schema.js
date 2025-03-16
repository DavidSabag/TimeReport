const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const managerResponseSchema = Joi.object({
  response: Joi.string().valid('approve', 'reject').required(),
  employeeId: Joi.string().required()
});

const updateReportSchema = Joi.object({
  empManagerId: Joi.string().required(),
  clock: Joi.string().valid('clockIn', 'clockOut').required(),
  note: Joi.string().allow('').optional()
});

module.exports = {
  loginSchema,
  managerResponseSchema,
  updateReportSchema
};