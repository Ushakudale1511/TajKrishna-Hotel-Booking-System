import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      setIsLoading(true);

      try {
        const data = await getAllRooms();

        const mapped = (data || []).map((room) => ({
          id: room.id,
          roomType: room.roomType || "No Room Type",
          roomPrice: room.roomPrice || 0,
          photo: room.photo || null,
        }));

        setRooms(mapped);
        setFilteredRooms(mapped);
      } catch (err) {
        setError(err?.message || "Failed to load rooms");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (isLoading) return <div className="mt-4">Loading rooms…</div>;
  if (error) return <div className="text-danger mt-4">Error: {error}</div>;

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
        </Col>
      </Row>

      <Row>
        {filteredRooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))
        )}
      </Row>
    </Container>
  );
};

export default Room;
