const router = require('express').Router();

router.post('/login', (request, response) => {

  console.log(request.body);

  response.status(200).send({
    status: true,
    message: 'Request received successfully!'
  });

});

module.exports = router;
