import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
});

const workspacesSchema = Joi.object({
  name: Joi.string().min(2).required(),
  emails: Joi.array().min(1).items(Joi.string()).required(),
});

const updateWorkspacesSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

export default { 
  loginSchema,
  registerSchema,
  workspacesSchema,
  updateWorkspacesSchema,
};
