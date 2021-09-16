const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const ValidateSignup = require('../../config/validators');

router.post('/login', (request, response) => {

  console.log(request.body);

  response.status(200).send({
    status: true,
    message: 'Request received successfully!'
  });

});

router.post('/sign-up',  (request, response) => {

  const userData = request.body;

  const value = ValidateSignup.validate(userData);

  if (value.error) {
    return response.status(200).send({
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
    console.log(error);
    return response.status(400).send({
      status: false,
      message: error
    });

  });

});

module.exports = router;
