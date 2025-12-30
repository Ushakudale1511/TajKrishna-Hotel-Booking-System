import { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (err) {
      setError(err?.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      await fetchBookings();
    } catch (err) {
      setError(err?.message || "Failed to cancel booking");
    }
  };

  return (
    <section className="container" style={{ backgroundColor: "whitesmoke" }}>
      <Header title="Existing Bookings" />

      {error && <div className="text-danger mb-3">{error}</div>}

      {isLoading ? (
        <div>Loading existing bookings...</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};

export default Bookings;
