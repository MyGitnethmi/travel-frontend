const joi = require('joi');
const {passwordValidator} = require("../config");

const linkGoogleSchema = joi.object({
  username: joi.string().email().required(),
  password: joi.string().regex(passwordValidator),
  idToken: joi.string().required()
});

module.exports = linkGoogleSchema;
