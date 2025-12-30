import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);

    try {
      const result = await getAllRooms();
      setRooms(result || []);
      setFilteredRooms(result || []);
    } catch (err) {
      setErrorMessage(err?.message || "Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete room ${roomId}?`
    );

    if (!confirmDelete) return;

    try {
      await deleteRoom(roomId);
      setSuccessMessage(`Room ${roomId} deleted successfully`);
      fetchRooms();
    } catch (err) {
      setErrorMessage(err?.message || "Delete failed");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  // pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-4">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-4">{errorMessage}</p>
        )}
      </div>

      {isLoading ? (
        <p className="text-center mt-5">Loading existing rooms…</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Existing Rooms</h2>

            <Link to="/add-room">
              <button className="btn btn-hotel">
                <FaPlus /> Add Room
              </button>
            </Link>
          </div>

          <Row className="mb-3">
            <Col md={6}>
              <RoomFilter
                data={rooms}
                setFilteredData={setFilteredRooms}
              />
            </Col>
          </Row>

          {filteredRooms.length === 0 ? (
            <p>No rooms found.</p>
          ) : (
            <>
              <table className="table table-bordered table-hover shadow">
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Room Type</th>
                    <th>Room Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRooms.map((room) => (
                    <tr key={room.id} className="text-center">
                      <td>{room.id}</td>
                      <td>{room.roomType}</td>
                      <td>{room.roomPrice}</td>

                      <td className="d-flex justify-content-center gap-2">
                        <Link to={`/edit-room/${room.id}`}>
                          <button className="btn btn-info btn-sm">
                            <FaEye />
                          </button>
                        </Link>

                        <Link to={`/edit-room/${room.id}`}>
                          <button className="btn btn-warning btn-sm">
                            <FaEdit />
                          </button>
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(room.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default ExistingRooms;
