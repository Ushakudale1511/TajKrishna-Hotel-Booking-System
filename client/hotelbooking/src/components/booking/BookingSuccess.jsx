import { useLocation, Link } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
  const location = useLocation();

  const message = location.state?.message;
  const error = location.state?.error;

  const readableError =
    typeof error === "string"
      ? error
      : error?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

  const hasData = message || error;

  return (
    <div className="container">
      <Header title="Booking Status" />

      <div className="mt-5">
        {!hasData ? (
          <div className="text-center">
            <p>No booking data found.</p>
            <Link to="/" className="btn btn-primary">
              Go back home
            </Link>
          </div>
        ) : message ? (
          <div>
            <h3 className="text-success">Booking Successful!</h3>

            {/* ⭐ HANDLE STRING vs OBJECT MESSAGE */}
            {typeof message === "string" ? (
              <p className="text-success">{message}</p>
            ) : (
              <div className="card p-3 mt-2">
                <p><strong>Guest:</strong> {message.guestFullName}</p>
                <p><strong>Email:</strong> {message.guestEmail}</p>
                <p><strong>Check-in:</strong> {message.checkInDate}</p>
                <p><strong>Check-out:</strong> {message.checkOutDate}</p>
                <p><strong>Total Guests:</strong> {message.totalNumOfGuest}</p>
                <p><strong>Confirmation Code:</strong> {message.bookingConfirmationCode}</p>
                <p><strong>Room:</strong> {message.room?.roomType}</p>
              </div>
            )}

            <Link to="/profile" className="btn btn-success mt-3">
              View My Bookings
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Error Booking Room</h3>
            <p className="text-danger">{readableError}</p>

            <Link to="/" className="btn btn-secondary mt-3">
              Try Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
