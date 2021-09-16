const joi = require('joi');
const {passwordValidator} = require("../config");

const loginSchema = joi.object({
  username: joi.string().email().required(),
  password: joi.string().regex(passwordValidator)
});

module.exports = loginSchema;
