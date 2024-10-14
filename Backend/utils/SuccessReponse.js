class SuccessResponse {
  constructor(message, data = null, statusCode = 200) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.success = true; // Indicate the success of the operation
  }

  // Method to return the formatted success response
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = SuccessResponse;
