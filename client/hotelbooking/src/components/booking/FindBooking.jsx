import { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import moment from "moment";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingInfo, setBookingInfo] = useState(null);

  const handleFindBooking = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a confirmation code.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setBookingInfo(null);

    try {
      const booking = await getBookingByConfirmationCode(
        confirmationCode.trim()
      );

      if (booking) {
        setBookingInfo(booking);
        setSuccessMessage("Booking found!");
      } else {
        setError("Booking not found.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Error fetching booking."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingInfo?.id) return;

    if (!window.confirm("Cancel booking?")) return;

    try {
      await cancelBooking(bookingInfo.id);
      setSuccessMessage("Booking cancelled!");
      setBookingInfo(null);
      setConfirmationCode("");
    } catch {
      setError("Error cancelling booking.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Find Booking</h2>

          <Form>
            <Form.Group as={Row}>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Confirmation code"
                  disabled={isLoading}
                />
              </Col>

              <Col xs={3}>
                <Button
                  variant="primary"
                  onClick={handleFindBooking}
                  disabled={isLoading}
                  className="w-100"
                >
                  {isLoading ? "Loading..." : "Find"}
                </Button>
              </Col>
            </Form.Group>
          </Form>

          {error && <p className="text-danger mt-3">{error}</p>}
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}

          {bookingInfo && (
            <div className="mt-3">
              <p><strong>ID:</strong> {bookingInfo.id}</p>
              <p><strong>Room:</strong> {bookingInfo.room?.roomType}</p>
              <p>
                <strong>Check-in:</strong>{" "}
                {moment(bookingInfo.checkInDate).format("MMM Do YYYY")}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {moment(bookingInfo.checkOutDate).format("MMM Do YYYY")}
              </p>

              <Button variant="danger" onClick={handleCancelBooking}>
                Cancel Booking
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FindBooking;
