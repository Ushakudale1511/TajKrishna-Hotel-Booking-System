import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// LOCAL images
import deluxeImg from "../../assets/images/Deluxe Room.jpg";
import luxuryImg from "../../assets/images/luxury.jpg";
import standardImg from "../../assets/images/standard.jpg";

const RoomCard = ({ room }) => {

  // 👉 Select image based on room type
  const getFallbackImage = () => {
    const type = room?.roomType?.toUpperCase() || "";

    if (type.includes("DELUX")) return deluxeImg;
    if (type.includes("LUX")) return luxuryImg;
    if (type.includes("STANDARD")) return standardImg;

    return "https://placehold.co/220x150?text=No+Image";
  };

  // 👉 DB image OR fallback
  const photoSrc =
    room?.photo && room.photo !== ""
      ? `data:image/png;base64,${room.photo}`
      : getFallbackImage();

  return (
    <Col className="mb-4" xs={12}>
      <Card className="shadow-sm">
        <Card.Body className="d-flex flex-wrap align-items-center gap-3">

          <div className="flex-shrink-0">
            <Link to={`/book-room/${room.id}`}>
              <Card.Img
                variant="top"
                src={photoSrc}
                alt={room?.roomType || "Room"}
                style={{
                  width: "220px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Link>
          </div>

          <div className="flex-grow-1">
            <Card.Title className="hotel-color mb-2">
              {room?.roomType || "Room"}
            </Card.Title>

            <Card.Text className="fw-semibold">
              ₹{room?.roomPrice || 0} / night
            </Card.Text>
          </div>

          <div className="flex-shrink-0">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book now
            </Link>
          </div>

        </Card.Body>
      </Card>
    </Col>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    photo: PropTypes.string,
    roomType: PropTypes.string,
    roomPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default RoomCard;
