import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { getRoomById } from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import {
  FaCar,
  FaParking,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [roomInfo, setRoomInfo] = useState({
    id: "",
    photo: "",
    roomType: "",
    roomPrice: 0,
  });

  const { roomId } = useParams();

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const response = await getRoomById(roomId);
        setRoomInfo(response);
      } catch (err) {
        const readable =
          err?.message ||
          err?.response?.data ||
          "Failed to load room details.";

        setError(readable);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoom();
  }, [roomId]);

  // 👇 fallback image — NO FILE NEEDED
  const imageSrc = roomInfo.photo
    ? `data:image/png;base64,${roomInfo.photo}`
    : "https://picsum.photos/600/300";

  return (
    <div>
      <section className="container">
        <div className="row">
          {/* ROOM DETAILS */}
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information…</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={imageSrc}
                  alt="Room"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />

                <table className="table table-bordered mt-3">
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>

                    <tr>
                      <th>Price per night:</th>
                      <td>₹ {roomInfo.roomPrice}</td>
                    </tr>

                    <tr>
                      <th>Room Services:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li><FaWifi /> Wifi</li>
                          <li><FaTv /> Netflix Premium</li>
                          <li><FaUtensils /> Breakfast</li>
                          <li><FaCar /> Car Service</li>
                          <li><FaParking /> Parking</li>
                          <li><FaTshirt /> Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* BOOKING FORM */}
          <div className="col-md-8">
            {!isLoading && !error && (
              <BookingForm
                roomId={roomId}
                roomPrice={roomInfo.roomPrice}
                roomType={roomInfo.roomType}
              />
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};

export default Checkout;
