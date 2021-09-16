const {OAuth2Client} = require('google-auth-library');
const passport = require('passport');
const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

const googleAuth = require('../../config/google-util');
const ValidateSignup = require('../../validators/sign-up-validator');
const ValidLogin = require('../../validators/login-validator');

const client = new OAuth2Client(googleAuth.clientSecret);

router.post('/login', (request, response) => {

  console.log(request.body);

  const credentials = request.body;

  const value = ValidLogin.validate(credentials);

  if (value.error) {
    return response.status(400).send({
      status: false,
      message: value.error.details
    });
  }

  User.findOne({username: credentials.username}).then(user => {

    console.log(user);

    if (!user || user.auth.method === 'google') {
      return response.status(400).send({
        status: false,
        message: 'Username or password is incorrect..!'
      });
    }

    user.validPassword(credentials.password).then(valid => {

      if (!valid) {
        return response.status(400).send({
          status: false,
          message: 'Username or password is incorrect..!'
        });
      }

      response.status(200).send({
        status: 'true',
        message: 'Login successful..!',
        user: user.toAuthJSON()
      });

    });

  }).catch(() => {
    return response.status(500).send({
      status: false,
      message: 'Server error..!'
    });
  });

});

router.post('/sign-up', (request, response) => {

  const userData = request.body;

  const value = ValidateSignup.validate(userData);

  if (value.error) {
    return response.status(400).send({
      status: false,
      message: value.error.details
    });
  }

  const user = new User({
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone
  });

  user.setPassword(userData.password);

  user.save().then(() => {

    response.status(200).send({
      status: true,
      message: 'User added successfully!',
      user: user.toAuthJSON()
    });

  }).catch(error => {

    return response.status(400).send({
      status: false,
      message: error
    });

  });

});

router.post('/google-sign-in', async (request, response) => {


  const ticket = await client.verifyIdToken({
    idToken: request.body.idToken,
    audience: googleAuth.clientId
  });

  const userDetails = ticket.getPayload()

  User.count({username: userDetails.email}).then(count => {

    if (count === 0) {

      const user = new User({
        username: userDetails.email,
        firstName: userDetails.given_name,
        lastName: userDetails.family_name,
        auth: {method: 'google'}
      });

      user.save().then(() => {

        response.status(200).send({
          status: true,
          message: 'User added successfully!',
          user: user.toAuthJSON()
        });

      }).catch(() => {

        return response.status(500).send({
          status: false,
          message: 'An unknown error occurred..!'
        });

      });

    } else {

      User.findOne({username: userDetails.email}).then(user => {

        response.status(200).send({
          status: true,
          message: 'This account is already registered..!',
          user: user.toAuthJSON()
        });

      }).catch(() => {

        return response.status(500).send({
          status: false,
          message: 'An unknown error occurred..!'
        });

      });

    }

  });

});

module.exports = router;
