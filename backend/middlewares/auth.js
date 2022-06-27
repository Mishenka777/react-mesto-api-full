const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    throw (new UnauthorizedError('Необходима авторизация'));
  }
  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw (new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
