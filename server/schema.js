const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const managerResponseSchema = Joi.object({
  response: Joi.string().valid('approve', 'reject').required(),
});

module.exports = {
  loginSchema,
  managerResponseSchema
};