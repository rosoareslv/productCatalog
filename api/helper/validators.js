const Joi = require("joi");

const loginUser = Joi.object({
  username: Joi.string().alphanum().max(20).required(),
  password: Joi.string().alphanum().max(20).required(),
});

const registerUser = Joi.object({
  name: Joi.string().alphanum().max(20).required(),
  username: Joi.string().alphanum().max(20).required(),
  password: Joi.string().alphanum().required(),
});

const registerProduct = Joi.object({
  title: Joi.string().max(20).required(),
  description: Joi.string().max(50).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().max(20),
});

const updateProduct = Joi.object({
  title: Joi.string().max(20),
  description: Joi.string().max(50),
  price: Joi.number().min(0),
  category: Joi.string().max(20),
});

const registerCategory = Joi.object({
  title: Joi.string().max(20).required(),
  description: Joi.string().max(50).required(),
});

const updateCategory = Joi.object({
  title: Joi.string().max(20),
  description: Joi.string().max(50),
});

module.exports = {
  loginUser,
  registerUser,
  registerProduct,
  updateProduct,
  registerCategory,
  updateCategory,
};
