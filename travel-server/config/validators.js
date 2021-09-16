const joi = require('joi');

const signUpSchema = joi.object({
  username: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).required(),
  phone: joi.string().regex(/^((\+94)|0)?\d{9}$/),
  agreement: joi.boolean().equal(true)
});

module.exports = signUpSchema;
