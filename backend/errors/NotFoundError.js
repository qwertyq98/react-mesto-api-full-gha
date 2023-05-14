const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
