const BaseError = require('./BaseError');

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
