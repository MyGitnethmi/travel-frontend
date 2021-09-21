const {OAuth2Client} = require('google-auth-library');
const router = require('express').Router();
const mongoose = require('mongoose');
const pug = require('pug');

const User = mongoose.model('User');

const transporter = require('../../config/mail-config');

const googleAuth = require('../../config/google-util');
const ValidateSignup = require('../../validators/sign-up-validator');
const ValidLogin = require('../../validators/login-validator');
const LinkGoogle = require('../../validators/link-google-validator');
const PasswordResetSchema = require('../../validators/reset-password-validator');

const client = new OAuth2Client(googleAuth.clientSecret);

router.post('/login', (request, response) => {

  const credentials = request.body;
  const value = ValidLogin.validate(credentials);
  if (value.error) {
    return response.status(400).send({
      status: false,
      message: value.error.details
    });
  }

  User.findOne({username: credentials.username}).then(user => {

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

        if (user.auth.method === 'google') {

          response.status(200).send({
            status: true,
            message: 'This account is already registered..!',
            user: user.toAuthJSON()
          });

        } else {

          response.status(409).send({
            status: false,
            message: userDetails.email
          });

          console.log(userDetails.email);

        }

      }).catch(() => {
        return response.status(500).send({
          status: false,
          message: 'An unknown error occurred..!'
        });
      });

    }

  });

});

router.post('/link-google', async (request, response) => {

  const userData = request.body;
  const value = LinkGoogle.validate(userData);
  if (value.error) {
    return response.status(400).send({
      status: false,
      message: value.error.details
    });
  }

  const ticket = await client.verifyIdToken({
    idToken: request.body.idToken,
    audience: googleAuth.clientId
  });

  const userDetails = ticket.getPayload();

  User.findOne({username: userDetails.email}).then(user => {

    if (!user) {
      return response.status(400).send({
        status: false,
        message: 'User not found..!'
      });
    }

    user.validPassword(userData.password).then(valid => {

      if (!valid) {
        return response.status(400).send({
          status: false,
          message: 'Password is incorrect..!'
        });
      }

      user.auth = {method: 'google'}
      user.save().then(() => {

        response.status(200).send({
          status: true,
          message: 'Authentication method updated to Google successfully..!',
          user: user.toAuthJSON()
        });

      }).catch(() => {

        response.status(500).send({
          status: false,
          message: 'An unknown error occurred..!'
        });

      });

    }).catch(() => {
      response.status(500).send({
        status: false,
        message: 'An unknown error occurred..!'
      });
    });

  }).catch(() => {
    response.status(500).send({
      status: false,
      message: 'An unknown error occurred..!'
    });
  });

});

router.post('/send-password-reset-email', async (request, response) => {

  const username = request.body.username;
  if (!username) {
    response.status(400).send({
      status: false,
      message: 'Username is required..!'
    });
  }

  try {

    const user = await User.findOne({username})

    if (!user) {
      return response.status(401).send({
        status: false,
        message: 'Invalid username..!'
      });
    }

    const passwordResetTemplate = pug.compileFile('./templates/password-reset-email.pug');

    const token = user.generateJWT();

    const emailBody = passwordResetTemplate({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatar: user.avatar.thumbnail,
      token
    });

    const mailOptions = {
      from: 'vishvajayasanka@gmail.com',
      to: user.username,
      subject: 'GoPedia Password Reset',
      html: emailBody
    }

    await transporter.sendMail(mailOptions);

    user.auth.token = token;

    await user.save();

    response.status(200).send({
      status: true,
      message: 'Email sent successfully..!'
    });

  } catch (error) {
    response.status(500).send({
      message: 'An unknown error occurred..!'
    });
  }

});

router.post('/reset-password', async (request, response) => {

  const userData = request.body;
  const value = PasswordResetSchema.validate(userData);
  if (value.error) {
    return response.status(400).send({
      status: false,
      message: value.error.details
    });
  }

  try {

    const user = await User.findOne({username: userData.username});

    if (!user) {
      return response.status(401).send({
        status: false,
        message: 'Username does not match the requested account username..!'
      });
    }

    user.resetPassword(userData.password, async (error, result) => {

      if (error) {
        return response.status(401).send({
          status: false,
          message: error
        });
      }

      await user.save();

      response.status(200).send({
        status: true,
        message: result
      })

    });

  } catch (error) {
    response.status(500).send({
      status: false,
      message: 'An unknown error occurred..!'
    });
  }

});

module.exports = router;
