import { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [roomPrice, setRoomPrice] = useState(0);

  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email") || "";

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: userEmail,
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: 1,
    numOfChildren: 0,
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]:
        name === "numOfAdults" || name === "numOfChildren"
          ? Number(value)
          : value,
    });
  };

  const getRoomPrice = async () => {
    try {
      const res = await getRoomById(roomId);
      setRoomPrice(res.roomPrice || 0);
    } catch {
      setRoomPrice(0);
    }
  };

  useEffect(() => {
    getRoomPrice();
  }, [roomId]);

  const calculatePayment = () => {
    const days = moment(booking.checkOutDate).diff(
      moment(booking.checkInDate),
      "days"
    );
    return days > 0 ? days * roomPrice : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!booking.guestFullName.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (moment(booking.checkOutDate).isSameOrBefore(booking.checkInDate)) {
      alert("Checkout date must be after Check-in date");
      return;
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }

    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, {
        ...booking,
        userId: Number(userId),
        totalNumOfGuest:
          Number(booking.numOfAdults) + Number(booking.numOfChildren),
      });

      navigate("/booking-success", {
        state: { message: confirmationCode },
      });
    } catch (err) {
      navigate("/booking-success", {
        state: { error: err?.response?.data || "Booking failed" },
      });
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4>Reserve Room</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <Form.Group>
                <Form.Label>Full name</Form.Label>
                <FormControl
                  required
                  type="text"
                  name="guestFullName"
                  placeholder="Enter your full name"
                  value={booking.guestFullName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* EMAIL — EDITABLE */}
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <FormControl
                  required
                  type="email"
                  name="guestEmail"
                  value={booking.guestEmail}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* DATES */}
              <fieldset className="mt-3">
                <legend>Lodging Period</legend>

                <FormControl
                  required
                  type="date"
                  name="checkInDate"
                  value={booking.checkInDate}
                  min={moment().format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                />

                <FormControl
                  className="mt-2"
                  required
                  type="date"
                  name="checkOutDate"
                  value={booking.checkOutDate}
                  min={booking.checkInDate || moment().format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                />
              </fieldset>

              {/* GUESTS */}
              <fieldset className="mt-3">
                <legend>Guests</legend>

                <FormControl
                  required
                  type="number"
                  name="numOfAdults"
                  min={1}
                  value={booking.numOfAdults}
                  onChange={handleInputChange}
                />

                <FormControl
                  className="mt-2"
                  required
                  type="number"
                  name="numOfChildren"
                  min={0}
                  value={booking.numOfChildren}
                  onChange={handleInputChange}
                />
              </fieldset>

              <button className="btn btn-hotel mt-3" type="submit">
                Continue
              </button>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
