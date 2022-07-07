const { UserFacingError } = require("./base.error");

class UnAuthorizedError extends UserFacingError {
  constructor(message, options = {}) {
    super(message);
    for (let key of Object.keys(options)) {
      this[key] = value;
    }
  }
  get statusCode() {
    return 401;
  }
}

module.exports = { UnAuthorizedError };
