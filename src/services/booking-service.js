// seat avaiblitiy -----

const axios = require("axios");
// axios for making reqss get , post etc

const { FLIGHT_SERVICE_PATH } = require("../config/server-config");
const { BookingRepository } = require("../repository/index");
const ServiceError = require("../utils/errors/service-error");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `http://${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      // call to flight service
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;

      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient seats in the flight"
        );
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `http://${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;

      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      return finalBooking;
      /*
       */
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
