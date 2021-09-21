const jwt = require('jsonwebtoken');
const {secret} = require("./index");

const verifyToken = (request, response, next) => {

  if (!request.headers.authentication) {
    return response.status(401).send({
      status: false,
      message: 'Unauthorized request..!'
    });
  }

  const token = request.headers.authentication.split(' ')[1];
  if (token === 'null') {
    return response.status(401).send({
      status: false,
      message: 'Unauthorized request..!'
    });
  }

  try {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      return response.status(401).send({
        status: false,
        message: 'Unauthorized request..!'
      });
    }

    request.username = payload.username;
    request.role = payload.role;
    next();

  } catch (error) {
    return response.status(500).send({
      status: false,
      message: 'Server error..!'
    });
  }

}

module.exports = verifyToken;
