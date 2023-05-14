const BaseError = require('./BaseError');

class ForbiddenError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
