import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);

    try {
      await onConfirm(); // parent handles navigation
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-1"></div>

      <div className="card card-body mt-5">
        <h4 className="card-title hotel-color">Reservation Summary</h4>

        <p>
          Full Name : <strong>{booking.guestFullName}</strong>
        </p>

        <p>
          Email : <strong>{booking.guestEmail}</strong>
        </p>

        <p>
          Check-in Date :{" "}
          <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
        </p>

        <p>
          Check-out Date :{" "}
          <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
        </p>

        <p>
          Number of Days : <strong>{numberOfDays}</strong>
        </p>

        <h5 className="hotel-color">Number of Guests</h5>

        <p>
          Adult{booking.numOfAdults > 1 ? "s" : ""} :
          <strong> {booking.numOfAdults}</strong>
        </p>

        <p>
          Children : <strong>{booking.numOfChildren}</strong>
        </p>

        {payment > 0 ? (
          <>
            <p>
              Total Payment : <strong>₹ {payment}</strong>
            </p>

            {isFormValid && (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing booking...
                  </>
                ) : (
                  "Confirm booking and proceed to payment"
                )}
              </Button>
            )}
          </>
        ) : (
          <p className="text-danger">
            Check-out date must be after check-in date.
          </p>
        )}
      </div>
    </div>
  );
};

BookingSummary.propTypes = {
  booking: PropTypes.shape({
    guestFullName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    checkInDate: PropTypes.string.isRequired,
    checkOutDate: PropTypes.string.isRequired,
    numOfAdults: PropTypes.number.isRequired,
    numOfChildren: PropTypes.number.isRequired,
  }).isRequired,
  payment: PropTypes.number.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default BookingSummary;
