class ApplicationError extends Error {
  get name() {
    return this.constructor.name;
  }
}
class UserFacingError extends Error {}

module.exports = { UserFacingError, ApplicationError };
