class RecipeError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class (Error) constructor
    this.name = this.constructor.name; // Set the error name to the class name
    this.statusCode = statusCode || 500; // Default status code to 500 (Internal Server Error)

    Error.captureStackTrace(this, this.constructor); // Captures the stack trace for better debugging
  }
}

module.exports = RecipeError;
