class SuccessResponse {
  constructor({ message, statusCode, metadata = {} }) {
    this.message = message || "Success";
    this.status = statusCode || 200;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

module.exports = SuccessResponse;
