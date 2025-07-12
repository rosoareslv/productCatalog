const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().alphanum().max(20).required(),
    password: Joi.string().alphanum().max(20).required()
})

const registerSchema = Joi.object({
    name: Joi.string().alphanum().max(20).required(),
    username: Joi.string().alphanum().max(20).required(),
    password: Joi.string().alphanum().required()
})

module.exports = { loginSchema, registerSchema }