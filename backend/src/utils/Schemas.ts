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
  title: Joi.string().min(2).required(),
  emails: Joi.array().min(1).items(Joi.string()).required(),
});

const updateWorkspacesSchema = Joi.object({
  title: Joi.string().min(2).required(),
});

const membersSchema = Joi.object({
  email: Joi.string().email().required(),
  admin: Joi.boolean().required(),
});

const columnSchema = Joi.object({
  title: Joi.string().min(1).required(),
});

const cardsSchema = Joi.object({
  title: Joi.string().min(2).required(),
  content: Joi.string().min(2).required(),
});

export default { 
  loginSchema,
  registerSchema,
  workspacesSchema,
  updateWorkspacesSchema,
  membersSchema,
  columnSchema,
  cardsSchema,
};
