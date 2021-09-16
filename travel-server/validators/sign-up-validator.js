const joi = require('joi');
const {phoneValidator, passwordValidator} = require("../config");

const signUpSchema = joi.object({
  username: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().regex(passwordValidator).required(),
  phone: joi.string().regex(phoneValidator),
  agreement: joi.boolean().equal(true)
});

module.exports = signUpSchema;
