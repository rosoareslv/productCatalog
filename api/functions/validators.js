import Joi from "joi";

export const loginUserValidator = Joi.object({
  username: Joi.string().alphanum().max(20).required(),
  password: Joi.string().alphanum().max(20).required(),
});

export const registerUserValidator = Joi.object({
  name: Joi.string().max(50).required(),
  username: Joi.string().alphanum().max(20).required(),
  password: Joi.string().alphanum().required(),
});

export const registerProductValidator = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(100).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().alphanum().max(20),
});

export const updateProductValidator = Joi.object({
  title: Joi.string().max(50),
  description: Joi.string().max(100),
  price: Joi.number().min(0),
  category: Joi.string().max(50),
});

export const registerCategoryValidator = Joi.object({
  title: Joi.string().alphanum().max(50).required(),
  description: Joi.string().max(100).required(),
});

export const updateCategoryValidator = Joi.object({
  title: Joi.string().alphanum().max(50),
  description: Joi.string().max(100),
});
