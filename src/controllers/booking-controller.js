const { BookingService } = require("../services/index");
const { ServiceError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

const bookingService = new BookingService();

class BookingController {
  constructor() {}

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: {},
        data: {},
      });
    }
  }
}

module.exports = BookingController;
