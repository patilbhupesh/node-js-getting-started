class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }

  static badRequest(msg) {
    return new ApiError(400, { message: msg.errors });
  }
}

module.exports = ApiError;