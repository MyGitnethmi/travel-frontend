const joi = require('joi');
const {passwordValidator} = require("../config");

const passwordResetSchema = joi.object({
  username: joi.string().email().required(),
  password: joi.string().regex(passwordValidator),
  token: joi.string().required()
});

module.exports = passwordResetSchema;
