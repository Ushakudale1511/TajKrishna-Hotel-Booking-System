import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";
import { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;

    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);

        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Guest</th>
            <th>Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guests</th>
            <th>Confirmation Code</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.room?.id}</td>
              <td>{booking.room?.roomType}</td>

              <td>{format(parseISO(booking.checkInDate), "dd-MMM-yyyy")}</td>
              <td>{format(parseISO(booking.checkOutDate), "dd-MMM-yyyy")}</td>

              <td>{booking.guestFullName}</td>
              <td>{booking.guestEmail}</td>

              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfGuest}</td>

              <td>{booking.bookingConfirmationCode}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBookings.length === 0 && (
        <p className="text-center mt-3">
          No booking found for the selected dates.
        </p>
      )}
    </section>
  );
};

BookingsTable.propTypes = {
  bookingInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      checkInDate: PropTypes.string.isRequired,
      checkOutDate: PropTypes.string.isRequired,
      guestFullName: PropTypes.string.isRequired,
      guestEmail: PropTypes.string.isRequired,
      numOfAdults: PropTypes.number.isRequired,
      numOfChildren: PropTypes.number.isRequired,
      totalNumOfGuest: PropTypes.number.isRequired,
      bookingConfirmationCode: PropTypes.string.isRequired,
      room: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        roomType: PropTypes.string,
      }),
    })
  ).isRequired,
  handleBookingCancellation: PropTypes.func.isRequired,
};

export default BookingsTable;
