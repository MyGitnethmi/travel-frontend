const router = require('express').Router();

router.get('/', (request, response) => {
  response.status(200).send('<h1>Hello from the server!</h1>');
});

module.exports = router;
