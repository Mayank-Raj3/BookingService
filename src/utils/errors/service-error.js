const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
  constructor(
    message,
    explanation,
    statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  ) {}
}
