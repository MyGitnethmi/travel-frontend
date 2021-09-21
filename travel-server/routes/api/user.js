const router = require('express').Router();

const verifyToken = require('../../config/verify-user');

router.post('/user-details', verifyToken, (request, response) => {

  response.status(200).send({
    status: true,
    message: 'Request received successfully..!'
  });

});

module.exports = router;
